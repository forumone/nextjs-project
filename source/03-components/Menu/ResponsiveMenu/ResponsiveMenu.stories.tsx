import dropdownMenuArgs from '@/source/03-components/Menu/DropdownMenu/dropdownMenuArgs';
import { Meta, StoryObj } from '@storybook/react';
import ResponsiveMenuComponent from './ResponsiveMenu';

const meta: Meta<typeof ResponsiveMenuComponent> = {
  title: 'Components/Menu/Responsive Menu',
  component: ResponsiveMenuComponent,
  tags: ['autodocs'],
};

type Story = StoryObj<typeof ResponsiveMenuComponent>;
const ResponsiveMenu: Story = {
  args: dropdownMenuArgs,
};

export default meta;
export { ResponsiveMenu };
