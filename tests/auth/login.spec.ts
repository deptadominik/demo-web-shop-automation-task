import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";

test.describe("Login / Session", () => {
  // In a real-world setup, test users would be created via backend API
  // as part of test setup rather than through the UI
  const user = {
    email: "test.user@commerce.com",
    password: "P@ssword100%",
  };

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test("should login, persist session and logout", async ({ page }) => {
    await loginPage.fillEmail(user.email);
    await loginPage.fillPassword(user.password);
    await loginPage.clickLogInButton();

    await expect(loginPage.header.getLogoutLink()).toHaveAttribute("href", "/logout");

    await page.reload();
    await expect(loginPage.header.getLogoutLink()).toHaveAttribute("href", "/logout");

    await loginPage.header.getLogoutLink().click();

    await expect(loginPage.header.getLoginLink()).toHaveAttribute("href", "/login");
  });
});
