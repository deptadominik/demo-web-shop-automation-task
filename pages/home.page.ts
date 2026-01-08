import { BasePage } from './base.page';
import { Locator } from '@playwright/test';

export class HomePage extends BasePage {
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;

  constructor(page: any) {
    super(page);
    this.searchInput = this.page.locator('#small-searchterms');
    this.searchButton = this.page.locator('.search-box-button');
  }

  async open() {
    await this.goto('/');
  }

  async searchFor(term: string) {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }
}
