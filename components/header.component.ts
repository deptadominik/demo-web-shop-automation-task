import { Locator, Page } from '@playwright/test';

export class HeaderComponent {
  private readonly root: Locator;
  private readonly cartLink: Locator;
  private readonly loginLink: Locator;
  private readonly logoutLink: Locator;

  constructor(root: Locator) {
    this.root = root;
    this.cartLink = this.root.locator('.ico-cart');
    this.loginLink = this.root.locator('.ico-login');
    this.logoutLink = this.root.locator('.ico-logout');
  }

  async openCart() {
    await this.cartLink.click();
  }

  async clickLogin() {
    await this.loginLink.click();
  }

  async clickLogout() {
    await this.logoutLink.click();
  }

  getCartLink(): Locator {
    return this.cartLink;
  }

  getLoginLink(): Locator {
    return this.loginLink;
  }

  getLogoutLink(): Locator {
    return this.logoutLink;
  }
}
