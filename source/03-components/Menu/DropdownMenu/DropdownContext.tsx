import { Context, createContext } from 'react';

const DropdownContext: Context<Record<string | number, boolean>> =
  createContext({});

export default DropdownContext;
