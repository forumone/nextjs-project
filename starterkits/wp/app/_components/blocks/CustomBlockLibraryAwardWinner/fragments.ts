import { gql } from '@apollo/client';

const fragments = {
  key: `CustomBlockLibraryAwardWinnerFragment`,
  entry: gql`
    fragment CustomBlockLibraryAwardWinnerFragment on CustomBlockLibraryAwardWinner {
      film {
        title
        slug
        featuredImage {
          node {
            altText
            sourceUrl(size: MEDIUM)
          }
        }
      }
      attributes {
        backgroundSrc
        introText
      }
    }
  `,
};

export default fragments;
