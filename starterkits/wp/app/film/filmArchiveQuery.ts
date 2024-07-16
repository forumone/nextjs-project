import { gql } from '@apollo/client';

const filmArchiveQuery = gql`
  query FilmArchive($first: Int, $last: Int, $after: String, $before: String) {
    films(first: $first, last: $last, after: $after, before: $before) {
      edges {
        cursor
        node {
          slug
          uri
          title
          id
          featuredImage {
            node {
              altText
              uri
              sourceUrl
              srcSet(size: MEDIUM)
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        startCursor
        endCursor
        hasPreviousPage
      }
    }
  }
`;

export default filmArchiveQuery;
