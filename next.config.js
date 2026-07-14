const basePath = '';
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');
const SvgSpritemapPlugin = require('svg-spritemap-webpack-plugin').default;

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  basePath,
  /**
   * Custom Webpack Config
   * https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
   */
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NEXT_BASEPATH': JSON.stringify(basePath || ''),
      }),
    );

    config.plugins.push(
      new StylelintWebpackPlugin({
        exclude: ['node_modules', 'storybook-static'],
      }),
    );

    config.plugins.push(
      new SvgSpritemapPlugin('source/01-global/icon/svgs/*.svg', {
        output: {
          filename: 'static/sprite.artifact.svg',
          svg4everybody: false,
          svgo: true,
        },
        sprite: {
          prefix: '',
          generate: {
            title: false,
            use: true,
          },
        },
      }),
    );

    return config;
  },
};
