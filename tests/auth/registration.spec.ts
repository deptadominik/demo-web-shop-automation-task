import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/register.page';
import { createUniqueUser } from '../../fixtures/user.factory';

test.describe('User Registration', () => {
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.open();
  });

  test('should register a new user successfully', async () => {
    const user = createUniqueUser();

    await registerPage.selectGender('male');
    await registerPage.fillFirstName(user.firstName);
    await registerPage.fillLastName(user.lastName);
    await registerPage.fillEmail(user.email);
    await registerPage.fillPassword(user.password);
    await registerPage.clickRegisterButton();

    await expect(registerPage.getSuccessMessage())
      .toHaveText('Your registration completed');
  });

  test('should show validation error for invalid email', async () => {
    const user = createUniqueUser();

    await registerPage.fillFirstName(user.firstName);
    await registerPage.fillLastName(user.lastName);
    await registerPage.fillEmail('invalid-email');
    await registerPage.fillPassword(user.password);
    await registerPage.clickRegisterButton();

    await expect(registerPage.getEmailValidationMessage())
      .toHaveText('Wrong email');
  });

  test('should show validation error for invalid password', async () => {
    const user = createUniqueUser();

    await registerPage.fillFirstName(user.firstName);
    await registerPage.fillLastName(user.lastName);
    await registerPage.fillEmail(user.email);
    await registerPage.fillPassword('123');
    await registerPage.clickRegisterButton();

    await expect(registerPage.getPasswordValidationMessage())
      .toHaveText('The password should have at least 6 characters.');
  });
});