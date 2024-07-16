import { gql } from '@apollo/client';

const fragments = {
  key: `CustomBlockLibraryFilmSelectorFragment`,
  entry: gql`
    fragment CustomBlockLibraryFilmSelectorFragment on CustomBlockLibraryFilmSelector {
      film {
        slug
        title
        featuredImage {
          node {
            sourceUrl(size: SMALL)
          }
        }
      }
    }
  `,
};

export default fragments;
