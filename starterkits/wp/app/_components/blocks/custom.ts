import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

const customBlocks: Record<string, ComponentType> = {
  CustomBlockLibraryPostSelector: dynamic(
    () => import('./CustomBlockLibraryPostSelector'),
  ),
};

export default customBlocks;
