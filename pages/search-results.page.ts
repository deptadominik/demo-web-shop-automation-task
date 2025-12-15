import { BasePage } from './base.page';
import { Locator } from '@playwright/test';
import { AdvancedSearchComponent } from '../components/advanced-search.component';

export class SearchResultsPage extends BasePage {
  private readonly sortDropdown: Locator;
  private readonly productTitles: Locator;
  private readonly productPrices: Locator;
  private readonly noResultsMessage: Locator;
  private readonly advancedSearchRoot: Locator;

  readonly advancedSearch: AdvancedSearchComponent;

  constructor(page: any) {
    super(page);

    this.sortDropdown = this.page.locator('#products-orderby');
    this.productTitles = this.page.locator('.product-title a');
    this.productPrices = this.page.locator('.actual-price');
    this.noResultsMessage = this.page.locator('.result');

    this.advancedSearchRoot = this.page.locator('.search-input');

    this.advancedSearch = new AdvancedSearchComponent(
      this.advancedSearchRoot
    );
  }

  async sortBy(option: 'Price: Low to High' | 'Price: High to Low') {
    await this.sortDropdown.selectOption({ label: option });
  }

  getProductTitles(): Locator {
    return this.productTitles;
  }

  getProductPrices(): Locator {
    return this.productPrices;
  }

  getNoResultsMessage(): Locator {
    return this.noResultsMessage;
  }
}