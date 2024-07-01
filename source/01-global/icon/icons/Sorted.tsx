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
const SvgSorted = ({
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
      viewBox="0 0 320 512"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon', modifierClasses)}
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="m182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8h256c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
    </svg>
  );
};
export default SvgSorted;
