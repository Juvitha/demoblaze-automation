import { Page, expect } from '@playwright/test';
import { homeLocators } from '../locators/homeLocators';

export class HomePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('/');
  }

  async verifyHomePageOpened() {
    await expect(this.page).toHaveTitle('STORE');
    await expect(this.page.locator(homeLocators.signUpLink)).toBeVisible();
  }

  async clickSignUp() {
    await this.page.click(homeLocators.signUpLink);
  }

  async clickLogin() {
    await this.page.click(homeLocators.loginLink);
  }

  async verifyWelcome(username: string) {
    await expect(this.page.locator(homeLocators.welcomeText)).toHaveText('Welcome ' + username);
  }

  async selectCategory(category: string) {
    const target = this.page.locator(homeLocators.categoryLinks).filter({ hasText: category }).first();
    await expect(target).toBeVisible();
    await target.click();
  }

  async openProduct(productName: string) {
    await this.page.locator(homeLocators.productLinks, { hasText: productName }).first().click();
  }

  async openCart() {
    await this.page.click(homeLocators.cartLink);
  }

  // after the order, the site takes us back to the home page (categories are visible)
  async verifyHomeShown() {
    await expect(this.page).toHaveURL(/.*(index\.html|\/)?$/);
    await expect(this.page.locator('#nava')).toContainText('PRODUCT STORE');
  }
}