import HeroBgImage from '@/source/03-components/HeroBgImage/HeroBgImage';
import Wysiwyg from '@/source/03-components/Wysiwyg/Wysiwyg';
import Page from '@/source/04-templates/Page/Page';
import {
  FragmentType,
  getFragmentData,
  graphql,
} from '@/types/drupal/__generated__';
import parse from 'html-react-parser';
import Image from 'next/image';
import { JSX } from 'react';

const BasicPageFragment = graphql(`
  fragment BasicPageFragment on NodePage {
    title
    body {
      processed
    }
  }
`);

function BasicPageFull(props: {
  entity: FragmentType<typeof BasicPageFragment>;
}): JSX.Element {
  const page = getFragmentData(BasicPageFragment, props.entity);
  return (
    <Page title={page.title}>
      <HeroBgImage
        heroImage={<Image src="/hero-placeholder.jpg" alt="Foo" />}
        title={page.title}
      />
      <Wysiwyg>
        {page.body && typeof page.body.processed === 'string' ? (
          <Wysiwyg>{parse(page.body.processed)}</Wysiwyg>
        ) : null}
      </Wysiwyg>
    </Page>
  );
}

export { BasicPageFragment };
export default BasicPageFull;
