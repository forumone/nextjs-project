import { Meta, StoryObj } from '@storybook/react';
import { withGlobalWrapper } from '../../../.storybook/decorators';
import DropdownComponent from './Dropdown';
import dropdownArgs from './dropdownArgs';

const meta: Meta<typeof DropdownComponent> = {
  title: 'Components/Dropdown',
  component: DropdownComponent,
  decorators: [withGlobalWrapper],
  tags: ['autodocs'],
};

type Story = StoryObj<typeof DropdownComponent>;
const Dropdown: Story = {
  args: dropdownArgs,
  name: 'Navigation Menu from YAML',
};

const WithExpandedAbout: Story = {
  args: {
    ...dropdownArgs,
    // Pre-expand the About section
    expandedItems: { About: true },
  },
  name: 'Navigation Menu with Expanded About Section',
};

const WithNestedSubmenu: Story = {
  args: {
    ...dropdownArgs,
    // Pre-expand the About section and the About Staff submenu
    expandedItems: {
      About: true,
      'About Staff': true,
    },
  },
  name: 'Navigation Menu with Nested Submenu',
};

export default meta;
export { Dropdown, WithExpandedAbout, WithNestedSubmenu };
