import { gql } from '@apollo/client';
import filmSelectorFragments from '../CustomBlockLibraryFilmSelector/fragments';

const fragments = {
  key: `CustomBlockLibraryFeaturedFilmsFragment`,
  entry: gql`
    fragment CustomBlockLibraryFeaturedFilmsFragment on CustomBlockLibraryFeaturedFilms {
      innerBlocks {
        __typename
        clientId
        name
        renderedHtml
        parentClientId
        ...CustomBlockLibraryFilmSelectorFragment
      }
    }
  `,
  dependencies: [filmSelectorFragments],
};

export default fragments;
