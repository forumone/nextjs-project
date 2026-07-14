import clsx from 'clsx';
import { useId, type SVGProps } from 'react';
import iconManifest, { IconName } from './manifest';

interface IconProps {
  name: IconName;
  title?: string;
  titleId?: string;
  isHidden?: boolean;
  modifierClasses?: string | string[];
}

const Icon = ({
  name,
  modifierClasses,
  isHidden,
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & IconProps) => {
  const generatedTitleId = useId();
  const resolvedTitleId = titleId ?? generatedTitleId;

  return (
    <svg
      role={title ? 'img' : undefined}
      aria-hidden={isHidden ? 'true' : 'false'}
      viewBox={iconManifest[name]}
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon', modifierClasses)}
      aria-labelledby={title ? resolvedTitleId : undefined}
      {...props}
    >
      {title ? <title id={resolvedTitleId}>{title}</title> : null}
      <use href={`/_next/static/sprite.artifact.svg#${name}`} />
    </svg>
  );
};

export default Icon;
