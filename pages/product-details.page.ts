import { BasePage } from "./base.page";
import { Locator } from "@playwright/test";

export class ProductDetailsPage extends BasePage {
  private readonly productName: Locator;
  private readonly processorOptions: Locator;
  private readonly productPrice: Locator;
  private readonly quantityInput: Locator;
  private readonly addToCartButton: Locator;
  private readonly notificationBar: Locator;

  constructor(page: any) {
    super(page);

    this.productName = this.page.locator(".product-name h1");
    this.productPrice = this.page.locator(".product-price");
    this.quantityInput = this.page.locator("input.qty-input");
    this.addToCartButton = this.page.locator('[id^="add-to-cart-button"]');
    this.notificationBar = this.page.locator("#bar-notification");
    this.processorOptions = this.page.locator(".attributes label");
  }

  async selectProcessor(option: 'Slow' | 'Medium' | 'Fast') {
    await this.processorOptions
      .filter({ hasText: option })
      .click();
  }
  
  async setQuantity(quantity: number) {
    await this.quantityInput.fill(quantity.toString());
  }

  async addToCart() {
    await this.addToCartButton.click();
    await this.notificationBar.waitFor();
  }

  getProductName(): Locator {
    return this.productName;
  }

  getProductPrice(): Locator {
    return this.productPrice;
  }
}
