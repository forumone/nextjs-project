import { Meta, StoryObj } from '@storybook/react';
import { withGlobalWrapper } from '../../../../.storybook/decorators';
import DropdownComponent from './DropdownMenu';
import dropdownMenuArgs from './dropdownMenuArgs';

const meta: Meta<typeof DropdownComponent> = {
  title: 'Components/Menu/DropdownMenu',
  component: DropdownComponent,
  decorators: [withGlobalWrapper],
  tags: ['autodocs'],
};

type Story = StoryObj<typeof DropdownComponent>;
const Dropdown: Story = {
  args: dropdownMenuArgs,
};

export default meta;
export { Dropdown };
