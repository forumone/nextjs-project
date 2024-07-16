import Box from '@/source/03-components/Box/Box';
import { FragmentType, useFragment } from '@/types/wp/__generated__';
import { CustomBlockLibraryFeaturedTextListFragmentFragmentDoc } from '@/types/wp/__generated__/graphql';
import { isNotNullNorUndefined } from '@/utils/isNullOrUndefined';
import { JSX } from 'react';
import fragments from './fragments';

function CustomBlockLibraryFeaturedTextList(
  props: FragmentType<
    typeof CustomBlockLibraryFeaturedTextListFragmentFragmentDoc
  >,
): JSX.Element {
  const { attributes, innerBlocks } = useFragment(
    CustomBlockLibraryFeaturedTextListFragmentFragmentDoc,
    props,
  );
  return (
    <Box
      title={`${attributes?.title}`}
      innerHtml={
        innerBlocks
          ? innerBlocks
              .filter(isNotNullNorUndefined)
              .map(block => block.renderedHtml)
              .join('')
          : undefined
      }
    />
  );
}

CustomBlockLibraryFeaturedTextList.config = {
  name: 'CustomBlockLibraryFeaturedTextList',
};
CustomBlockLibraryFeaturedTextList.displayName =
  'CustomBlockLibraryFeaturedTextList';
CustomBlockLibraryFeaturedTextList.fragments = fragments;

export default CustomBlockLibraryFeaturedTextList;
