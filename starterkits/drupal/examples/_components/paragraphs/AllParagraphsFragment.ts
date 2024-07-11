import { graphql } from '@/types/__generated__';

/**
 * Fragment for all potential paragraph types we want to retrieve if they're
 * included (which typically means all paragraph types.) If you are using the
 * Paragraphs module, you'll want to copy this file but replace the fragments
 * with the fragments for your paragraphs.
 */
const AllParagraphsFragment = graphql(`
  fragment AllParagraphsFragment on ParagraphUnion {
    __typename
    ... on ParagraphInterface {
      id
    }
    ...QuoteParagraphFragment
    ...TriviaParagraphFragment
  }
`);

export default AllParagraphsFragment;
