import { test, expect } from '@playwright/test';
import { SearchResultsPage } from '../../pages/search-results.page';
import { ProductDetailsPage } from '../../pages/product-details.page';

test.describe('Product Discovery — Browse / Category', () => {
  let searchResultsPage: SearchResultsPage;
  let productDetailsPage: ProductDetailsPage;

  test.beforeEach(async ({ page }) => {
    searchResultsPage = new SearchResultsPage(page);
    productDetailsPage = new ProductDetailsPage(page);

    await page.goto('/');
  });

  test('should open product details page with the same title as in search results', async () => {
    await searchResultsPage.topMenu.openDesktopsCategory();

    const firstProductTitle = searchResultsPage.getProductTitles().first();

    await expect(firstProductTitle).toBeVisible();

    const expectedTitle = (await firstProductTitle.textContent())?.trim();
    expect(expectedTitle).toBeTruthy();

    await firstProductTitle.click();

    await expect(productDetailsPage.getProductName())
      .toHaveText(expectedTitle!);
  });
});
