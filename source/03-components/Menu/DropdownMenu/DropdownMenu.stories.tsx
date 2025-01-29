import { Meta, StoryObj } from '@storybook/react';
import { expect, fireEvent, userEvent, within } from '@storybook/test';
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

const DropdownMenuKeyboardTest: Story = {
  ...DropdownMenu,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    await fireEvent.focus(canvas.getByText('Home'));
    await user.click(canvas.getByText('Home'));
    await step('Menu can be navigated by Tab', async () => {
      await user.tab();
      await expect(canvas.getByText('About')).toHaveFocus();
    });
    await step('Menu can be opened with Spacebar', async () => {
      await user.keyboard('{Spacebar}');
      await expect(canvas.getByText('About submenu one')).toBeVisible();
      await expect(canvas.getByText('About submenu one')).toHaveFocus();
    });
    await step('Submenu can be opened with Spacebar', async () => {
      await user.keyboard('{Tab}{Spacebar}');
      await expect(canvas.getByText('Subsubmenu item one')).toBeVisible();
      await expect(
        canvas.getByText('Toggle Subnav').closest('button'),
      ).toHaveFocus();
    });
    await step('Submenu can be closed with Escape', async () => {
      await user.keyboard('{Tab}{Escape}');
      await expect(canvas.getByText('Subsubmenu item one')).not.toBeVisible();
      await expect(canvas.getByText('About submenu one')).toHaveFocus();
    });
    await step('Menu and submenu can be closed with Escape', async () => {
      await user.keyboard('{Tab}{Spacebar}{Escape}');
      await expect(canvas.getByText('Subsubmenu item one')).not.toBeVisible();
      await expect(canvas.getByText('About submenu one')).not.toBeVisible();
      await expect(canvas.getByText('About')).toHaveFocus();
    });
    await step(
      'Menu and submenu close when tabbing to parent menu',
      async () => {
        await user.keyboard('{Spacebar}{Tab}{Spacebar}{Tab}');
        await expect(canvas.getByText('Subsubmenu item one')).toBeVisible();
        await user.tab({ shift: true });
        await expect(canvas.getByText('Subsubmenu item one')).not.toBeVisible();
        await user.tab({ shift: true });
        await expect(canvas.getByText('About submenu one')).not.toBeVisible();
        await expect(canvas.getByText('About')).toHaveFocus();
      },
    );
  },
};

export default meta;
export { DropdownMenu, DropdownMenuKeyboardTest };
