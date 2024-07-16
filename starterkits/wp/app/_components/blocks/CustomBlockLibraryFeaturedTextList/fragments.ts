import { gql } from '@apollo/client';

const fragments = {
  key: `CustomBlockLibraryFeaturedTextListFragment`,
  entry: gql`
    fragment CustomBlockLibraryFeaturedTextListFragment on CustomBlockLibraryFeaturedTextList {
      attributes {
        title
      }
      clientId
      name
      innerBlocks {
        renderedHtml
      }
    }
  `,
};

export default fragments;
