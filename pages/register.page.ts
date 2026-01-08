import { BasePage } from './base.page';
import { Locator } from '@playwright/test';

export class RegisterPage extends BasePage {
  private readonly maleGenderRadio: Locator;
  private readonly femaleGenderRadio: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmPasswordInput: Locator;
  private readonly registerButton: Locator;
  private readonly successMessage: Locator;
  private readonly emailValidationMessage: Locator;
  private readonly passwordValidationMessage: Locator;

  constructor(page: any) {
    super(page);

    this.maleGenderRadio = this.page.locator('#gender-male');
    this.femaleGenderRadio = this.page.locator('#gender-female');
    this.firstNameInput = this.page.locator('#FirstName');
    this.lastNameInput = this.page.locator('#LastName');
    this.emailInput = this.page.locator('#Email');
    this.passwordInput = this.page.locator('#Password');
    this.confirmPasswordInput = this.page.locator('#ConfirmPassword');
    this.registerButton = this.page.locator('#register-button');
    this.successMessage = this.page.locator('.result');
    this.emailValidationMessage = this.page.locator(
      '[data-valmsg-for="Email"]'
    );
    this.passwordValidationMessage = this.page.locator(
      '[data-valmsg-for="Password"]'
    );
  }

  async open() {
    await this.goto('/register');
  }

  async selectGender(gender: 'male' | 'female' | string) {
    const normalizedGender = gender.toLowerCase();

    switch (normalizedGender) {
      case 'male':
        await this.maleGenderRadio.check();
        break;
      case 'female':
        await this.femaleGenderRadio.check();
        break;
      default:
        throw new Error(
          `Unsupported gender value: "${gender}", expected "male" or "female".`
        );
    }
  }

  async fillFirstName(firstName: string) {
    await this.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.lastNameInput.fill(lastName);
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
  }

  async clickRegisterButton() {
    await this.registerButton.click();
  }

  getSuccessMessage(): Locator {
    return this.successMessage;
  }

  getEmailValidationMessage(): Locator {
    return this.emailValidationMessage;
  }

  getPasswordValidationMessage(): Locator {
    return this.passwordValidationMessage;
  }
}