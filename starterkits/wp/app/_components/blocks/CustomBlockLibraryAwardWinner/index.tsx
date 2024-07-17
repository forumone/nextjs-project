import { CustomBlockLibraryAwardWinnerFragmentFragment } from '@/types/__generated__/graphql';
import fragments from './fragments';
import HeroBgImage from './HeroBgImage/HeroBgImage';

function CustomBlockLibraryAwardWinner({
  attributes,
  film,
}: CustomBlockLibraryAwardWinnerFragmentFragment): JSX.Element {
  if (!film || !attributes) {
    return <p>Film or attributes not set.</p>;
  }

  const { backgroundSrc, introText } = attributes;
  const heroSrc = backgroundSrc || film.featuredImage?.node.sourceUrl || '';
  const heroAlt = film.featuredImage?.node.altText || '';

  return (
    <HeroBgImage
      heroImage={<img src={heroSrc} alt={heroAlt} />}
      title={film.title || ''}
      button={{
        label: 'Read more',
        href: `/film/${film.slug || ''}`,
        variant: 'primary',
        styleSize: 'medium',
      }}
      summary={introText}
      summaryPosition="aboveTitle"
      hasOverlay={true}
    />
  );
}

CustomBlockLibraryAwardWinner.config = {
  name: 'CustomBlockLibraryAwardWinner',
};
CustomBlockLibraryAwardWinner.displayName = 'CustomBlockLibraryAwardWinner';
CustomBlockLibraryAwardWinner.fragments = fragments;

export default CustomBlockLibraryAwardWinner;
