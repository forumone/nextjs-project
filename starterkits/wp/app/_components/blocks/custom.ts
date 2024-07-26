import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

/**
 * Blocks included here will have their fragments combined into the
 * custom fragment WpBlocksFragment, handled by the script block-fragments.ts
 */
const customBlocks: Record<string, ComponentType> = {
  CustomBlockLibraryPostSelector: dynamic(
    () => import('./CustomBlockLibraryPostSelector'),
  ),
};

export default customBlocks;
