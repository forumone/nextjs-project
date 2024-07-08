import { Meta, StoryObj } from '@storybook/react';
import PagerComponent from './Pager';
import data from './pager.yml';

const settings: Meta<typeof PagerComponent> = {
  title: 'Components/Pager',
  component: PagerComponent,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

const Pager: StoryObj<typeof PagerComponent> = {
  args: data,
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/',
        query: {
          page: '6',
        },
      },
    },
  },
};

export default settings;
export { Pager };
