import DropdownMenuContext from '@/source/03-components/Menu/DropdownMenu/DropdownMenuContext';
import MenuBar, {
  MenuBarProps,
} from '@/source/03-components/Menu/DropdownMenu/MenuBar';
import { JSX } from 'react';

interface DropdownMenuProps extends MenuBarProps {
  showMenusOnHover?: boolean;
  useArrowKeys?: boolean;
}

function DropdownMenu({
  modifierClasses,
  showMenusOnHover = false,
  useArrowKeys = true,
  ...props
}: DropdownMenuProps): JSX.Element {
  return (
    <DropdownMenuContext.Provider value={{ showMenusOnHover, useArrowKeys }}>
      <MenuBar {...props} />
    </DropdownMenuContext.Provider>
  );
}

export default DropdownMenu;
export type { DropdownMenuProps };
