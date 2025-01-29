import { createContext } from 'react';

interface DropdownMenuOptions {
  useArrowKeys?: boolean;
  showMenusOnHover?: boolean;
}

const DropdownMenuContext = createContext<DropdownMenuOptions>({
  useArrowKeys: true,
  showMenusOnHover: false,
});

export default DropdownMenuContext;
