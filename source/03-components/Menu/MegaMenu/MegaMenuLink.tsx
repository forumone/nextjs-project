import clsx from 'clsx';
import { GessoComponent } from 'gesso';
import styles from './mega-menu.module.css';

export interface MegaMenuLinkProps extends GessoComponent {
  items: MegaMenuLinkProps[];
  menuLevel: number;
  menuName?: string;
  menuClass?: string;
  itemClass?: string;
  linkClass?: string;
  title?: string;
  url?: string;
  below?: MegaMenuLinkProps[];
  featured?: JSX.Element;
  isActive?: boolean;
}

function MegaMenuLink({ items }: MegaMenuLinkProps): JSX.Element {
  return (
    <ul className={clsx(styles.subnav)}>
      {items &&
        items.map((item, index) => {
          return (
            <li key={index} className={styles.item}>
              <a href={item.url} className={styles.link}>
                {item.title}
              </a>
            </li>
          );
        })}
    </ul>
  );
}

export default MegaMenuLink;
