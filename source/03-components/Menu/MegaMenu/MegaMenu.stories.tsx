import { Meta, StoryObj } from '@storybook/react';
import { ImageTeaser } from '../../ImageTeaser/ImageTeaser.stories';
import MegaMenuComponent from './MegaMenu';
import { MegaMenuLinkProps } from './MegaMenuLink';
import megaMenuArgs from './mega-menu.yml';

const meta: Meta<typeof MegaMenuComponent> = {
  title: 'Components/Menu/Mega Menu',
  component: MegaMenuComponent,
  tags: ['autodocs'],
};

const menuItems = megaMenuArgs.items.map((item: MegaMenuLinkProps) => ({
  ...item,
  featured: ImageTeaser.render ? (
    <ImageTeaser.render
      {...ImageTeaser.args}
      title={
        ImageTeaser.args && ImageTeaser.args.title ? ImageTeaser.args.title : ''
      }
    />
  ) : undefined,
}));

type Story = StoryObj<typeof MegaMenuComponent>;
const MegaMenu: Story = {
  args: {
    ...megaMenuArgs,
    items: menuItems,
  },
};

export default meta;
export { MegaMenu };
