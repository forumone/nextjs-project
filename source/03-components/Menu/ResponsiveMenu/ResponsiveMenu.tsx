'use client';

import { JSX, useEffect, useState } from 'react';
import DropdownMenu, { DropdownMenuProps } from '../DropdownMenu/DropdownMenu';
import OverlayMenu, { OverlayMenuProps } from '../OverlayMenu/OverlayMenu';

const MENU_BREAKPOINT = '700px';

type ResponsiveMenuProps = DropdownMenuProps & OverlayMenuProps;

function ResponsiveMenu({
  showOnHover,
  useArrowKeys,
  ...props
}: ResponsiveMenuProps): JSX.Element {
  const [mobile, setMobile] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(width >= ${MENU_BREAKPOINT})`);
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        setMobile(false);
      } else {
        setMobile(true);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    handleChange(mediaQuery);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return mobile ? (
    <OverlayMenu {...props} />
  ) : (
    <DropdownMenu
      {...props}
      showOnHover={showOnHover}
      useArrowKeys={useArrowKeys}
    />
  );
}

export default ResponsiveMenu;
export type { ResponsiveMenuProps };
