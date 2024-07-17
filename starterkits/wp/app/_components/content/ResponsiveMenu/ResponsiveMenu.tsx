'use client';

import siteSearchStyles from '@/app/_components/content/SiteSearch/site-search.module.css';
import SiteSearch from '@/app/_components/content/SiteSearch/SiteSearch';
import Menu, {
  BaseMenuProps,
  MenuItem,
} from '@/source/03-components/Menu/Menu';
import OverlayMenu from '@/source/03-components/Menu/OverlayMenu/OverlayMenu';
import useMobileHeader from '@/util/wp/useMobileHeader';
import styles from './responsive-menu.module.css';

interface ResponsiveMenuProps extends BaseMenuProps {
  mobileItems?: MenuItem[];
}

function ResponsiveMenu({
  items,
  mobileItems = [],
  modifierClasses,
}: ResponsiveMenuProps): JSX.Element {
  const combinedItems = items.concat(mobileItems);
  const mobile = useMobileHeader();
  const modifierClassesArr = modifierClasses
    ? Array.isArray(modifierClasses)
      ? [...modifierClasses]
      : [modifierClasses]
    : [];

  return (
    <>
      {mobile ? (
        <OverlayMenu items={combinedItems} />
      ) : (
        <>
          <Menu
            items={items}
            modifierClasses={[styles.menu, ...modifierClassesArr]}
            itemClasses={styles.item}
            linkClasses={styles.link}
          />{' '}
          <SiteSearch
            modifierClasses={siteSearchStyles.headerPrimarySearch}
            placeholder={'To search, type and hit enter.'}
            collapsed={true}
          />
        </>
      )}
    </>
  );
}

export default ResponsiveMenu;
