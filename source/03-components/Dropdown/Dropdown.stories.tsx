import { Meta, StoryObj } from '@storybook/react';
import { withGlobalWrapper } from '../../../.storybook/decorators';
import DropdownComponent from './Dropdown';
import dropdownArgs from './dropdownArgs';

const meta: Meta<typeof DropdownComponent> = {
  title: 'Components/Menu/Dropdown',
  component: DropdownComponent,
  decorators: [withGlobalWrapper],
  tags: ['autodocs'],
};

type Story = StoryObj<typeof DropdownComponent>;
const Dropdown: Story = {
  args: dropdownArgs,
};

export default meta;
export { Dropdown };
