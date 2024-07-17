import clsx from 'clsx';
import { GessoComponent } from 'gesso';
import { ElementType, JSX } from 'react';
import styles from './box.module.css';

interface BoxProps extends GessoComponent {
  title?: string;
  headingElement?: ElementType;
  innerHtml?: string;
}

function Box({
  title,
  headingElement: HeadingElement = 'h2',
  modifierClasses,
  innerHtml = '',
}: BoxProps): JSX.Element {
  return (
    <div className={clsx(modifierClasses)}>
      {title && (
        <HeadingElement className={styles.title}>{title}</HeadingElement>
      )}
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: innerHtml }}
      />
    </div>
  );
}

export default Box;
