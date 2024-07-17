import { FilmLink } from '@/app/_components/content/FeaturedFilms/FeaturedFilms';
import { CustomBlockLibraryFilmSelectorFragmentFragment } from '@/types/__generated__/graphql';
import fragments from './fragments';

function CustomBlockLibraryFilmSelector({
  film,
}: CustomBlockLibraryFilmSelectorFragmentFragment): JSX.Element {
  const imgSrc = film?.featuredImage?.node.sourceUrl || '';
  return (
    <FilmLink
      imgSrc={imgSrc}
      slug={film?.slug || ''}
      title={film?.title || ''}
    />
  );
}

CustomBlockLibraryFilmSelector.config = {
  name: 'CustomBlockLibraryFilmSelector',
};
CustomBlockLibraryFilmSelector.displayName = 'CustomBlockLibraryFilmSelector';
CustomBlockLibraryFilmSelector.fragments = fragments;

export default CustomBlockLibraryFilmSelector;
