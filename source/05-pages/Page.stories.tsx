import breadcrumbArgs from '@/source/03-components/Breadcrumb/breadcrumbArgs';
import wysiwygArgs from '@/source/03-components/Wysiwyg/wysiwygArgs';
import { Meta, StoryObj } from '@storybook/react';
import Breadcrumb from '../03-components/Breadcrumb/Breadcrumb';
import Wysiwyg from '../03-components/Wysiwyg/Wysiwyg';
import PageTemplate, { PageProps } from '../04-templates/Page/Page';
import PageWrapper from './page-wrappers/default';

interface PageStoryArgs {
  page: PageProps;
}

const settings: Meta<PageStoryArgs> = {
  title: 'Pages/Page',
};

const Page: StoryObj<PageStoryArgs> = {
  render: args => (
    <PageWrapper>
      <PageTemplate {...args.page} />
    </PageWrapper>
  ),
  args: {
    page: {
      preContent: <Breadcrumb {...breadcrumbArgs} />,
      title: 'Page Title',
      children: <Wysiwyg {...wysiwygArgs} />,
    },
  },
};

export default settings;
export { Page };
