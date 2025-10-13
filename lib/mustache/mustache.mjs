/**
 * Tiny Mustache
 * Adapted from https://github.com/aishikaty/tiny-mustache
 * Licensed under the MIT license: https://raw.githubusercontent.com/aishikaty/tiny-mustache/refs/heads/master/LICENSE.txt
 */
function mustache(template, self, parent, invert) {
  const render = mustache;
  let output = '';
  let i;

  function get(ctx, path) {
    const pathArr = path.pop ? path : path.split('.');
    let firstCtx = ctx[pathArr.shift()];
    firstCtx = firstCtx !== null ? firstCtx : '';
    return 0 in pathArr ? get(firstCtx, pathArr) : firstCtx;
  }

  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  let selfArr = Array.isArray(self) ? self : self ? [self] : [];
  selfArr = invert ? (0 in selfArr ? [] : [1]) : selfArr;

  for (i = 0; i < selfArr.length; i++) {
    let childCode = '';
    let depth = 0;
    let inverted;
    let ctx = typeof selfArr[i] === 'object' ? selfArr[i] : {};
    ctx = Object.assign({}, parent, ctx);
    ctx[''] = { '': selfArr[i] };

    template.replace(
      /([\s\S]*?)({{((\/)|(\^)|#)\s*(.*?)\s*}}|$)/g,
      (match, code, y, z, close, isInverted, name) => {
        if (!depth) {
          output += code.replace(
            /{{{(.*?)}}}|{{(!?)(&?)(>?)\s*(.*?)\s*}}/g,
            (_, raw, comment, isRaw, partial, varName) => {
              return raw
                ? get(ctx, raw)
                : isRaw
                  ? get(ctx, varName)
                  : partial
                    ? render(get(ctx, varName), ctx)
                    : !comment
                      ? escapeHTML(get(ctx, varName))
                      : '';
            },
          );
          inverted = isInverted;
        } else {
          childCode += (depth && !close) || depth > 1 ? match : code;
        }
        if (close) {
          if (!--depth) {
            const theName = get(ctx, name);
            if (/^f/.test(typeof theName)) {
              output += theName.call(ctx, childCode, t => {
                return render(t, ctx);
              });
            } else {
              output += render(childCode, theName, ctx, inverted);
            }
            childCode = '';
          }
        } else {
          ++depth;
        }
      },
    );
  }
  return output;
}

export default mustache;
