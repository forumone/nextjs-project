import { FragmentType, getFragmentData } from '@/types/drupal/__generated__';
import { JSX } from 'react';
import AllParagraphsFragment from './AllParagraphsFragment';
import QuoteParagraph from './QuoteParagraph';
import TriviaParagraph from './TriviaParagraph';

/**
 * Imports the appropriate template based on the paragraph type.
 *
 * If you are using the Paragraphs module, you'll want to copy this file but
 * replace with your paragraph types and templates.
 */
function mapParagraph(
  entity: FragmentType<typeof AllParagraphsFragment>,
): JSX.Element | null {
  const paragraph = getFragmentData(AllParagraphsFragment, entity);
  if (!paragraph?.id) {
    return null;
  }

  // TODO: This should be the cleaner switch using an object map.
  switch (paragraph.__typename) {
    case 'ParagraphQuote':
      return <QuoteParagraph paragraph={paragraph} key={paragraph.id} />;
    case 'ParagraphTrivia':
      return <TriviaParagraph paragraph={paragraph} key={paragraph.id} />;
    default:
      return null;
  }
}

export default mapParagraph;
