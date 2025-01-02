import { GessoComponent } from 'gesso';
import Link from 'next/link';
import {
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  JSX,
  ReactNode,
} from 'react';
import MenuLinks, { MenuLinksProps } from './MenuLinks';

interface MenuItemProps {
  title: ReactNode;
  url: string;
  inActiveTrail?: boolean;
  isButton?: boolean;
  below?: MenuItemProps[];
}

interface BaseMenuProps extends GessoComponent {
  items: MenuItemProps[];
}

interface MenuProps extends BaseMenuProps {
  itemClasses?: string | string[];
  linkClasses?: string | string[];
  subnavClasses?: string | string[];
  showSubmenuOnHover?: boolean;
  showSubmenuOnClick?: boolean;
  showSubmenuOnKeyUp?: boolean;
  useArrowKeys?: boolean;
}

const MenuLink = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  MenuItemProps & Omit<HTMLAttributes<HTMLElement>, 'title'>
>(function MenuLink({ title, url, isButton, ...props }, ref): JSX.Element {
  if (url === '<button>' || isButton) {
    return (
      <button ref={ref as ForwardedRef<HTMLButtonElement>} {...props}>
        {title}
      </button>
    );
  }
  return (
    <Link href={url} ref={ref as ForwardedRef<HTMLAnchorElement>} {...props}>
      {title}
    </Link>
  );
});

function Menu(props: MenuProps): JSX.Element {
  return <MenuLinks menuLevel={0} {...props} />;
}

export default Menu;
export { MenuLink, MenuLinks };
export type { BaseMenuProps, MenuItemProps, MenuLinksProps, MenuProps };
