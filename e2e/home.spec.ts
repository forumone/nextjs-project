import { expect, test } from '@playwright/test';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has the expected title', async ({ page }) => {
    await expect(page).toHaveTitle(/Forum One Next.js Starter App/);
  });

  test('renders the hero heading', async ({ page }) => {
    await expect(
      page
        .getByRole('heading', { name: 'Forum One Next.js Starter App' })
        .first(),
    ).toBeVisible();
  });

  test('has no accessibility-blocking landmarks missing', async ({ page }) => {
    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible();
  });
});
