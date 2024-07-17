import WpBlocksFragment from '@/util/wp/WpBlocksFragment';
import { gql } from '@apollo/client';

// Note: For some reason, if we use variable strings for the keys (i.e. `...${SomeFragmentKey}`),
// codegen will just totally ignore this whole query.
const getContentNodeQuery = gql`
  ${WpBlocksFragment}
  query GetContentNode(
    $id: ID!
    $idType: ContentNodeIdTypeEnum!
    $asPreview: Boolean!
  ) {
    contentNode(id: $id, idType: $idType, asPreview: $asPreview) {
      __typename
      ... on NodeWithTitle {
        title
      }
      ... on NodeWithEditorBlocks {
        editorBlocks(flat: true) {
          ...WpBlocksFragment
        }
      }
      date
    }
  }
`;

export default getContentNodeQuery;
