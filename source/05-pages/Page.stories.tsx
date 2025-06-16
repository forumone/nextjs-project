import { WYSIWYG as WysiwygStory } from '@/source/03-components/Wysiwyg/Wysiwyg.stories';
import { Meta, StoryObj } from '@storybook/nextjs';
import Breadcrumb from '../03-components/Breadcrumb/Breadcrumb';
import { Breadcrumb as BreadcrumbStory } from '../03-components/Breadcrumb/Breadcrumb.stories';
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
      preContent: <Breadcrumb {...BreadcrumbStory.args} />,
      title: 'Page Title',
      children: <Wysiwyg {...WysiwygStory.args} />,
    },
  },
};

export default settings;
export { Page };
