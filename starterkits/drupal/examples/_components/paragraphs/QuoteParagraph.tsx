import Quote from '@/source/03-components/Quote/Quote';
import { FragmentType, getFragmentData, graphql } from '@/types/__generated__';

/**
 * Fragment for a quote paragraph with just two plain text fields,
 * a quote and a citation.
 */
const QuoteParagraphFragment = graphql(`
  fragment QuoteParagraphFragment on ParagraphQuote {
    quote
    citation
  }
`);

/**
 * Component to display the quote. In this example, you would also need a
 * Quote component in source that displays the quote with whatever styling you
 * needed.
 *
 * Think of this as a paragraph--quote.html.twig template.
 */
function QuoteParagraph({
  paragraph,
}: {
  paragraph: FragmentType<typeof QuoteParagraphFragment>;
}) {
  const quoteParagraph = getFragmentData(QuoteParagraphFragment, paragraph);
  return (
    <Quote content={quoteParagraph.quote} citation={quoteParagraph.citation} />
  );
}

export default QuoteParagraph;
export { QuoteParagraphFragment };
