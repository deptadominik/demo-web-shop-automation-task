import { Locator } from '@playwright/test';

export class AdvancedSearchComponent {
  private readonly root: Locator;

  private readonly advancedSearchCheckbox: Locator;
  private readonly priceFromInput: Locator;
  private readonly priceToInput: Locator;
  private readonly submitButton: Locator;

  constructor(root: Locator) {
    this.root = root;

    this.advancedSearchCheckbox = this.root.locator('#As');
    this.priceFromInput = this.root.locator('#Pf');
    this.priceToInput = this.root.locator('#Pt');
    this.submitButton = this.root.locator('.search-button');
  }

  async enable() {
    await this.advancedSearchCheckbox.check();
  }

  async setPriceRange(from: number, to: number) {
    await this.priceFromInput.fill(from.toString());
    await this.priceToInput.fill(to.toString());
  }

  async submit() {
    await this.submitButton.click();
  }
}
