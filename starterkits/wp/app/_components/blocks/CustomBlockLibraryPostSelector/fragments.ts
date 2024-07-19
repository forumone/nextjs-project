import { gql } from '@apollo/client';

const fragments = {
  key: `CustomBlockLibraryPostSelectorFragment`,
  entry: gql`
    fragment CustomBlockLibraryPostSelectorFragment on CustomBlockLibraryPostSelector {
      post {
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  `,
};

export default fragments;
