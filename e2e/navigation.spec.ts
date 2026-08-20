import { expect, Page, test } from '@playwright/test';
import { MOBILE_MENU_BREAKPOINT } from '~components/Menu/ResponsiveMenu/constants';

const MOBILE_BREAKPOINT_TESTING = parseInt(MOBILE_MENU_BREAKPOINT, 10);

async function openMobileMenu(page: Page) {
  const viewport = page.viewportSize();
  if (viewport && viewport.width < MOBILE_BREAKPOINT_TESTING) {
    await page
      .getByRole('banner')
      .getByRole('button', { name: 'Menu' })
      .click();
  }
}

test.describe('Site navigation', () => {
  test('header menu links to Home and About', async ({ page }) => {
    await page.goto('/');

    const header = page.getByRole('banner');
    await expect(header.getByRole('link', { name: 'Home' })).toHaveAttribute(
      'href',
      '/',
    );
    await expect(header.getByRole('link', { name: 'About' })).toHaveAttribute(
      'href',
      '/about',
    );
  });

  test('navigating from Home to About via the header menu', async ({
    page,
  }) => {
    await page.goto('/');
    await openMobileMenu(page);

    await page.getByRole('banner').getByRole('link', { name: 'About' }).click();

    await expect(page).toHaveURL('/about');
    await expect(
      page.getByRole('heading', {
        name: 'About Forum One Next.js Starter App',
      }),
    ).toBeVisible();
  });

  test('navigating from Home to About via the footer menu', async ({
    page,
  }) => {
    await page.goto('/');

    await page
      .getByRole('contentinfo')
      .getByRole('link', { name: 'About' })
      .click();

    await expect(page).toHaveURL('/about');
    await expect(
      page.getByRole('heading', {
        name: 'About Forum One Next.js Starter App',
      }),
    ).toBeVisible();
  });

  test('footer menu links to Home and About', async ({ page }) => {
    await page.goto('/');

    const footer = page.getByRole('contentinfo');
    await expect(footer.getByRole('link', { name: 'Home' })).toHaveAttribute(
      'href',
      '/',
    );
    await expect(footer.getByRole('link', { name: 'About' })).toHaveAttribute(
      'href',
      '/about',
    );
  });
});
