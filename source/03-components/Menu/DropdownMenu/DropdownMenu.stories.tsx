import { Meta, StoryObj } from '@storybook/react';
import DropdownMenuComponent from './DropdownMenu';
import dropdownMenuArgs from './dropdownMenuArgs';

const meta: Meta<typeof DropdownMenuComponent> = {
  title: 'Components/Menu/Dropdown Menu',
  component: DropdownMenuComponent,
  tags: ['autodocs'],
};

type Story = StoryObj<typeof DropdownMenuComponent>;
const DropdownMenu: Story = {
  args: dropdownMenuArgs,
};

export default meta;
export { DropdownMenu };
