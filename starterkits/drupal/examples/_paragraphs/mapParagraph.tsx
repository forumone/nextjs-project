import { FragmentType, getFragmentData } from '@/types/drupal/__generated__';
import dynamic from 'next/dynamic';
import { ComponentType, JSX } from 'react';
import AllParagraphsFragment from './AllParagraphsFragment';

const paragraphMapping: Record<
  string,
  ComponentType<{ paragraph: FragmentType<never> }>
> = {
  ParagraphQuote: dynamic(() => import('./QuoteParagraph')),
  ParagraphTrivia: dynamic(() => import('./TriviaParagraph')),
};

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

  if (
    !paragraph?.id ||
    !paragraph?.__typename ||
    !Object.prototype.hasOwnProperty.call(
      paragraphMapping,
      paragraph.__typename,
    )
  ) {
    return null;
  }

  const ParagraphComponent = paragraphMapping[paragraph.__typename];
  return <ParagraphComponent paragraph={paragraph} key={paragraph.id} />;
}

export default mapParagraph;
