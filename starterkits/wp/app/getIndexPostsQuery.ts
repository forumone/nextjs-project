import { gql } from '@apollo/client';

const getIndexPostsQuery = gql`
  query GetIndexPosts {
    posts {
      nodes {
        id
        title
        uri
        slug
      }
    }
  }
`;

export default getIndexPostsQuery;
