// organize-imports-ignore
// This component is automatically generated.
// SVGs should be added to icon/svgs.
// See the project documentation for more information.
// tslint:disable:ordered-imports
import clsx from 'clsx';
import * as React from 'react';
import type { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
  isHidden?: boolean;
  modifierClasses?: string | string[];
}
const SvgFacebook = ({
  modifierClasses,
  isHidden,
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => {
  return (
    <svg
      role={title ? 'img' : undefined}
      aria-hidden={isHidden ? 'true' : 'false'}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon', modifierClasses)}
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="m19.5 0c1.2395895 0 2.2994748.44009977 3.1796875 1.3203125s1.3203125 1.94009797 1.3203125 3.1796875v15c0 1.2395895-.4400998 2.2994748-1.3203125 3.1796875s-1.940098 1.3203125-3.1796875 1.3203125h-2.9375v-9.296875h3.109375l.46875-3.625h-3.578125v-2.3125c0-.58333625.1223946-1.02083188.3671875-1.3125.2447929-.29166813.7213506-.4375 1.4296875-.4375l1.90625-.015625v-3.234375c-.6562533-.09375047-1.5833273-.140625-2.78125-.140625-1.4166738 0-2.5494749.4166625-3.3984375 1.25s-1.2734375 2.01040906-1.2734375 3.53125v2.671875h-3.125v3.625h3.125v9.296875h-8.3125c-1.23958953 0-2.29947477-.4400998-3.1796875-1.3203125s-1.3203125-1.940098-1.3203125-3.1796875v-15c0-1.23958953.44009977-2.29947477 1.3203125-3.1796875s1.94009797-1.3203125 3.1796875-1.3203125z" />
    </svg>
  );
};
export default SvgFacebook;
