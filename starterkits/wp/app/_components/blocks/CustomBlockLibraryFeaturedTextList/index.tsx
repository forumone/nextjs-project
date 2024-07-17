import Box from '@/app/_components/content/Box/Box';
import { FragmentType, useFragment } from '@/types/__generated__';
import { CustomBlockLibraryFeaturedTextListFragmentFragmentDoc } from '@/types/__generated__/graphql';
import { isNotNullNorUndefined } from '@/util/isNullOrUndefined';
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
