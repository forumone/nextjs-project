import SampleContent from '@/source/06-utility/storybook/SampleContent';
import { Meta, StoryObj } from '@storybook/react';
import LandingPageTemplate from './LandingPage';

const meta: Meta<typeof LandingPageTemplate> = {
  title: 'Templates/Landing Page',
  component: LandingPageTemplate,
};

const LandingPage: StoryObj<typeof LandingPageTemplate> = {
  render: args => (
    <LandingPageTemplate {...args}>
      <SampleContent>Main page content</SampleContent>
    </LandingPageTemplate>
  ),
  args: {
    title: 'Landing Page Title',
    hidePageTitle: false,
  },
};

export default meta;
export { LandingPage };
