import { FragmentType, getFragmentData } from '@/types/__generated__';
import dynamic from 'next/dynamic';
import { ComponentType, JSX } from 'react';
import AllParagraphsFragment from './AllParagraphsFragment';

type ParagraphComponentType = {
  paragraph: object;
};

/**
 * Maps the paragraph type as returned by GraphQL with the integration template.
 * As you add or remove paragraph types, you'll need to update this map.
 */
const paragraphMapping: Record<
  string,
  ComponentType<ParagraphComponentType>
> = {
  ParagraphAccordion: dynamic(() => import('./AccordionParagraph')),
  ParagraphCard: dynamic(() => import('./CardParagraph')),
  ParagraphCards: dynamic(() => import('./CardsParagraph')),
  ParagraphHero: dynamic(() => import('./HeroParagraph')),
  ParagraphWysiwyg: dynamic(() => import('./WysiwygParagraph')),
};

/**
 * Imports the appropriate template based on the paragraph type.
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
