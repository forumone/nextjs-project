import { expect, test } from '@playwright/test';

// The header uses ResponsiveMenu, which server-renders the mobile overlay
// menu and swaps to the desktop inline menu on the client once it detects a
// wide viewport. That swap only happens if client-side JS successfully
// hydrates, so these tests double as a canary for hydration breaking (e.g.
// if Next's dev server starts rejecting requests from the ddev hostname —
// see the `allowedDevOrigins` setting in next.config.js).
test.describe('ResponsiveMenu', () => {
  test('renders the desktop inline menu on a wide viewport', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');

    const header = page.getByRole('banner');

    // Once hydrated at this width, the hamburger button and off-canvas
    // overlay nav should be gone in favor of the always-visible inline menu.
    await expect(
      header.getByRole('button', { name: 'Menu' }),
    ).not.toBeVisible();
    await expect(header.getByRole('link', { name: 'About' })).toBeVisible();
  });

  test('renders the mobile hamburger menu on a narrow viewport', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 480, height: 800 });
    await page.goto('/');

    const header = page.getByRole('banner');
    const menuButton = header.getByRole('button', { name: 'Menu' });
    await expect(menuButton).toBeVisible();

    // The "About" link exists in the DOM already, but its <nav> ancestor is
    // clipped to zero height until the menu is opened, so it isn't visible.
    const nav = header.locator('nav');
    const aboutLink = header.getByRole('link', { name: 'About' });
    await expect(nav).toHaveJSProperty('offsetHeight', 0);

    await menuButton.click();

    // Clicking "Menu" hides that button and reveals a "Close" button in its
    // place, so check the opened state via the nav rather than re-querying
    // for a now-hidden "Menu" button by its accessible name.
    await expect(header.getByRole('button', { name: 'Close' })).toBeVisible();
    await expect(async () => {
      const navHeight = await nav.evaluate((el) => el.getBoundingClientRect().height);
      expect(navHeight).toBeGreaterThan(0);
    }).toPass();
    await expect(aboutLink).toBeVisible();
  });
});
