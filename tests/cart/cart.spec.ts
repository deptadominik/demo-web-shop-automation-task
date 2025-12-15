import { test, expect } from "@playwright/test";
import { SearchResultsPage } from "../../pages/search-results.page";
import { ProductDetailsPage } from "../../pages/product-details.page";
import { CartPage } from "../../pages/cart.page";

test.describe("Add to Cart", () => {
  let searchResultsPage: SearchResultsPage;
  let productDetailsPage: ProductDetailsPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    searchResultsPage = new SearchResultsPage(page);
    productDetailsPage = new ProductDetailsPage(page);
    cartPage = new CartPage(page);

    await page.goto("/");
  });

  test("should add product to cart with correct name, price and quantity", async () => {
    await searchResultsPage.topMenu.openDesktopsCategory();

    const firstProduct = searchResultsPage.getProductTitles().first();
    const expectedName = (await firstProduct.innerText()).trim();
    await firstProduct.click();
    const expectedPrice = (
      await productDetailsPage.getProductPrice().innerText()
    ).trim();

    await productDetailsPage.setQuantity(2);
    await productDetailsPage.selectProcessor("Slow");
    await productDetailsPage.addToCart();
    await productDetailsPage.header.openCart();

    const row = cartPage.getRowByProductName(expectedName);

    await expect(cartPage.getProductName(row)).toHaveText(expectedName);
    await expect(cartPage.getUnitPrice(row)).toHaveText(expectedPrice);
    await expect(cartPage.getQuantityInput(row)).toHaveValue("2");
  });
});
