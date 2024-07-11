// The fragment file won't be at its location until setup-drupal is run. Ignore
// the missing file, because @ts-expect-error then errors once setup-drupal is
// run and the file *is* there.
// @ts-ignore
import MenuItemFragment from '@/app/_components/navigation/MenuItemFragment';
import { MenuItem as GessoMenuItem } from '@/source/03-components/Menu/Menu';
import { FragmentType, getFragmentData } from '@/types/drupal/__generated__';
import { MenuItemFragmentFragment } from '@/types/drupal/__generated__/graphql';

interface MenuItemFragmentWithUrl extends MenuItemFragmentFragment {
  url: string;
}

function menuItemHasUrl(
  menuItem: MenuItemFragmentFragment,
): menuItem is MenuItemFragmentWithUrl {
  return typeof menuItem.url === 'string';
}

function prepMenuItems(
  items: FragmentType<typeof MenuItemFragment>[] | null | undefined,
): GessoMenuItem[] {
  if (!items) {
    return [];
  }
  return items
    .map(
      (
        menuItem: FragmentType<typeof MenuItemFragment>,
      ): MenuItemFragmentFragment =>
        getFragmentData(MenuItemFragment, menuItem),
    )
    .filter(menuItemHasUrl)
    .map(
      (menuItem): GessoMenuItem => ({
        title: menuItem.title,
        url: menuItem.url.replace('/drupal', ''),
      }),
    );
}

export { menuItemHasUrl, prepMenuItems };
export type { MenuItemFragmentWithUrl };
