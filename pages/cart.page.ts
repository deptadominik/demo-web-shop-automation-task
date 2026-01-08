import { BasePage } from "./base.page";
import { Locator } from "@playwright/test";

export class CartPage extends BasePage {
  private readonly cartItemRows: Locator;
  private readonly productNameInRow: Locator;
  private readonly unitPriceInRow: Locator;
  private readonly quantityInputInRow: Locator;
  private readonly subtotalInRow: Locator;
  private readonly updateCartButton: Locator;
  private readonly orderTotal: Locator;
  private readonly couponCodeInput: Locator;
  private readonly applyCouponButton: Locator;
  private readonly couponErrorMessage: Locator;

  constructor(page: any) {
    super(page);

    this.cartItemRows = this.page.locator("tr.cart-item-row");
    this.productNameInRow = this.page.locator(".product-name");
    this.unitPriceInRow = this.page.locator(".product-unit-price");
    this.quantityInputInRow = this.page.locator(".qty-input");
    this.subtotalInRow = this.page.locator(".product-subtotal");
    this.updateCartButton = this.page.locator(".update-cart-button");
    this.orderTotal = this.page.locator(".order-total");
    this.couponCodeInput = this.page.locator(".discount-coupon-code");
    this.applyCouponButton = this.page.locator(
      ".apply-discount-coupon-code-button"
    );
    this.couponErrorMessage = this.page.locator(".coupon-box .message");
  }

  async open() {
    await this.goto("/cart");
  }

  async updateCart() {
    await this.updateCartButton.click();
  }
   
  async applyCoupon(code: string) {
    await this.couponCodeInput.fill(code);
    await this.applyCouponButton.click();
  }

  getCouponErrorMessage(): Locator {
    return this.couponErrorMessage;
  }

  getRowByProductName(productName: string): Locator {
    return this.cartItemRows.filter({
      has: this.productNameInRow.filter({ hasText: productName }),
    });
  }

  getProductName(row: Locator): Locator {
    return row.locator(this.productNameInRow);
  }

  getUnitPrice(row: Locator): Locator {
    return row.locator(this.unitPriceInRow);
  }

  getQuantityInput(row: Locator): Locator {
    return row.locator(this.quantityInputInRow);
  }

  getSubtotal(row: Locator): Locator {
    return row.locator(this.subtotalInRow);
  }

  getOrderTotal(): Locator {
    return this.orderTotal;
  }
}
