import FeaturedFilms from '@/app/_components/content/FeaturedFilms/FeaturedFilms';
import { CustomBlockLibraryFeaturedFilmsFragmentFragment } from '@/types/__generated__/graphql';
import BlocksViewer from '../../content/BlocksViewer';
import fragments from './fragments';

function CustomBlockLibraryFeaturedFilms({
  innerBlocks,
}: CustomBlockLibraryFeaturedFilmsFragmentFragment): JSX.Element {
  return (
    <FeaturedFilms
      title="Featured Films"
      filmSelectorBlocks={
        <BlocksViewer innerBlocks={innerBlocks || undefined} />
      }
    />
  );
}

CustomBlockLibraryFeaturedFilms.config = {
  name: 'CustomBlockLibraryFeaturedFilms',
};
CustomBlockLibraryFeaturedFilms.displayName = 'CustomBlockLibraryFeaturedFilms';
CustomBlockLibraryFeaturedFilms.fragments = fragments;

export default CustomBlockLibraryFeaturedFilms;
