import { test, expect } from '@playwright/test';
import { CartPage } from '../../pages/cart.page';
import { addProductToCart } from '../../helpers/cart.api';

test.describe('Coupon / Discount', () => {
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
    await addProductToCart(page, 72, 1);
    await cartPage.open();
  });

  test('should show validation message for invalid coupon code', async ({ page }) => {
    await cartPage.applyCoupon('NON_EXISTENT_COUPON_123');

    await expect(cartPage.getCouponErrorMessage()).toContainText(
      'The coupon code you entered couldn\'t be applied to your order'
    );
  });
});
