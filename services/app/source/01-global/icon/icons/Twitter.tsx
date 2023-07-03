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
const SvgTwitter = ({
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
      <path d="m20 7.53125c-.5833362.26041797-1.2135383.43749953-1.890625.53125.7083369-.41666875 1.192707-1.02603766 1.453125-1.828125-.6770867.39583531-1.3749964.66145766-2.09375.796875-.6354198-.68750344-1.4322869-1.03125-2.390625-1.03125-.9062545 0-1.6796843.3203093-2.3203125.9609375s-.9609375 1.41405797-.9609375 2.3203125c0 .30208484.0260414.55208234.078125.75-1.3437567-.07291703-2.60416078-.41145531-3.78125-1.015625s-2.17707922-1.41145328-3-2.421875c-.30208484.52083594-.453125 1.07291375-.453125 1.65625 0 1.18750594.47395359 2.0989552 1.421875 2.734375-.48958578-.0104167-1.01041391-.145832-1.5625-.40625v.03125c0 .7812539.26041406 1.4765595.78125 2.0859375s1.16145453.9869784 1.921875 1.1328125c-.30208484.0833338-.56770719.125-.796875.125-.13541734 0-.33854031-.0208331-.609375-.0625.21875109.6562533.60676805 1.1979145 1.1640625 1.625s1.19010062.6458333 1.8984375.65625c-1.20833938.9375047-2.56770078 1.40625-4.078125 1.40625-.27083469 0-.53124875-.0156248-.78125-.046875 1.54167437.9791716 3.21874094 1.46875 5.03125 1.46875 1.1666725 0 2.2604116-.184894 3.28125-.5546875s1.8958297-.8645802 2.625-1.484375 1.3567682-1.3333293 1.8828125-2.140625.9166654-1.6510373 1.171875-2.53125.3828125-1.7578081.3828125-2.6328125c0-.18750094-.0052083-.32812453-.015625-.421875.6562533-.46875234 1.2031228-1.036455 1.640625-1.703125zm4-3.03125v15c0 1.2395895-.4400998 2.2994748-1.3203125 3.1796875s-1.940098 1.3203125-3.1796875 1.3203125h-15c-1.23958953 0-2.29947477-.4400998-3.1796875-1.3203125s-1.3203125-1.940098-1.3203125-3.1796875v-15c0-1.23958953.44009977-2.29947477 1.3203125-3.1796875s1.94009797-1.3203125 3.1796875-1.3203125h15c1.2395895 0 2.2994748.44009977 3.1796875 1.3203125s1.3203125 1.94009797 1.3203125 3.1796875z" />
    </svg>
  );
};
export default SvgTwitter;
