import clsx from 'clsx';
import { useId, type SVGProps } from 'react';
import { GessoComponent } from 'gesso';
import iconManifest, { IconName } from './manifest';

interface IconProps extends GessoComponent {
  name: IconName;
  title?: string;
  titleId?: string;
  isHidden?: boolean;
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
  const viewBox = iconManifest[name];

  if (!viewBox) {
    return null;
  }

  return (
    <svg
      role={title ? 'img' : undefined}
      aria-hidden={isHidden ? 'true' : 'false'}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('icon', modifierClasses)}
      aria-labelledby={title ? resolvedTitleId : undefined}
      {...props}
    >
      {title ? <title id={resolvedTitleId}>{title}</title> : null}
      <use href={`/sprite.artifact.svg#${name}`} />
    </svg>
  );
};

export default Icon;
