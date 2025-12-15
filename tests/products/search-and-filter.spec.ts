import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/home.page";
import { SearchResultsPage } from "../../pages/search-results.page";

test.describe("Product Discovery — Search + Filter", () => {
  let homePage: HomePage;
  let searchResultsPage: SearchResultsPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    searchResultsPage = new SearchResultsPage(page);

    await homePage.open();
  });

  test("should find electronics-related products and filter by price range", async () => {
    await homePage.searchFor("computer");

    const titles = searchResultsPage.getProductTitles();
    await expect(titles.first()).toBeVisible();

    const titlesText = await titles.allTextContents();
    for (const title of titlesText) {
      expect(title.toLowerCase()).toContain("computer");
    }

    await searchResultsPage.sortBy("Price: Low to High");
    await expect(async () => {
      const pricesText = await searchResultsPage
        .getProductPrices()
        .allTextContents();

      const prices = pricesText.map((p) => Number(p.replace("$", "").trim()));

      for (let i = 0; i < prices.length - 1; i++) {
        expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
      }
    }).toPass({
      timeout: 5000,
    });
  });

  test("should filter products by price range using advanced search", async () => {
    await homePage.searchFor("computer");

    await searchResultsPage.advancedSearch.enable();
    await searchResultsPage.advancedSearch.setPriceRange(500, 1500);
    await searchResultsPage.advancedSearch.submit();

    await expect(searchResultsPage.getProductTitles().first()).toBeVisible();

    await expect(async () => {
      const pricesText = await searchResultsPage
        .getProductPrices()
        .allTextContents();

      const prices = pricesText.map((p) => Number(p.replace("$", "").trim()));

      for (const price of prices) {
        expect(price).toBeGreaterThanOrEqual(500);
        expect(price).toBeLessThanOrEqual(1500);
      }
    }).toPass({ timeout: 5000 });
  });

  test("should handle no search results gracefully", async () => {
    await homePage.searchFor("nonexistent-product-xyz");

    await expect(searchResultsPage.getNoResultsMessage()).toHaveText(
      "No products were found that matched your criteria."
    );
  });
});
