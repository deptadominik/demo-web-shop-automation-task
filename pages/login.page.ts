import { BasePage } from './base.page';
import { Locator } from '@playwright/test';

export class LoginPage extends BasePage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: any) {
    super(page);

    this.emailInput = this.page.locator('#Email');
    this.passwordInput = this.page.locator('#Password');
    this.loginButton = this.page.locator('.login-button');
  }

  async open() {
    await this.goto('/login');
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLogInButton() {
    await this.loginButton.click();
  }
}
