import Article from '@/source/03-components/Article/Article';
import {
  FragmentType,
  getFragmentData,
  graphql,
} from '@/types/drupal/__generated__';
import { JSX } from 'react';

const ArticleFullFragment = graphql(`
  fragment ArticleFullFragment on NodeArticle {
    title
    created {
      timestamp
    }
    body {
      processed
    }
  }
`);

function ArticleDetailPage(props: {
  entity: FragmentType<typeof ArticleFullFragment>;
}): JSX.Element {
  const article = getFragmentData(ArticleFullFragment, props.entity);
  return <Article title={article.title}></Article>;
}

export { ArticleFullFragment };
export default ArticleDetailPage;
