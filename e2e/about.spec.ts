import { expect, test } from '@playwright/test';

test.describe('About page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
  });

  test('has the expected title', async ({ page }) => {
    await expect(page).toHaveTitle(/About Forum One Next.js Starter App/);
  });

  test('renders the page heading', async ({ page }) => {
    await expect(
      page.getByRole('heading', {
        name: 'About Forum One Next.js Starter App',
      }),
    ).toBeVisible();
  });

  test('links out to the Next.js docs', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Next.js' })).toHaveAttribute(
      'href',
      'https://nextjs.org/docs',
    );
  });
});
