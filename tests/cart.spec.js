import { test, expect } from '@playwright/test';

test('ajouter un produit au panier', async ({ page }) => {

  await page.goto('http://localhost:5173');

  await page.waitForSelector('[data-testid="product-card"]');

  await page.locator('[data-testid="product-card"]').first().hover();

  await page.locator('[data-testid="add-to-cart"]').first().click();

  await expect(page.locator('[data-testid="cart-count"]')).toContainText('1');

});