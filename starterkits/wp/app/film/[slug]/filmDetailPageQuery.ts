import WpBlocksFragment from '@/utils/wp/WpBlocksFragment';
import { gql } from '@apollo/client';

const filmDetailPageQuery = gql`
  ${WpBlocksFragment}
  query filmDetailPageQuery($id: ID!, $idType: FilmIdType!) {
    film(id: $id, idType: $idType) {
      title
      director
      releaseYear
      quote
      quoteAttribution
      featuredImage {
        node {
          altText
          mediaDetails {
            height
            width
          }
          mediaItemUrl
          title
          sourceUrl
        }
      }
      editorBlocks(flat: true) {
        ...WpBlocksFragment
      }
    }
  }
`;

export default filmDetailPageQuery;
