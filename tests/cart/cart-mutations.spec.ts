import { test, expect } from "@playwright/test";
import { CartPage } from "../../pages/cart.page";
import { addProductToCart } from "../../helpers/cart.api";

test.describe("Cart Mutations (API setup)", () => {
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
    await addProductToCart(page, 72, 2);
    await cartPage.open();
  });

  test("should update quantity and recalculate totals", async () => {
    const row = cartPage.getRowByProductName("Build your own cheap computer");

    await expect(row).toBeVisible();

    const unitPrice = Number(
      (await cartPage.getUnitPrice(row).innerText()).trim()
    );

    await cartPage.getQuantityInput(row).fill("3");
    await cartPage.updateCart();

    const subtotal = Number(
      (await cartPage.getSubtotal(row).innerText()).trim()
    );

    const total = Number(
      (await cartPage.getOrderTotal().innerText()).trim()
    );

    expect(subtotal).toBe(unitPrice * 3);
    expect(total).toBe(unitPrice * 3);
  });
});
