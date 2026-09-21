import { Page, expect } from '@playwright/test';
import { registerLocators } from '../locators/registerLocators';

export class RegisterPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async registerNewUser(user: any) {
    await this.page.check(registerLocators.genderFemale);
    await this.page.fill(registerLocators.firstName, user.firstName);
    await this.page.fill(registerLocators.lastName, user.lastName);
    await this.page.fill(registerLocators.email, user.email);
    await this.page.fill(registerLocators.password, user.password);
    await this.page.fill(registerLocators.confirmPassword, user.password);
    await this.page.click(registerLocators.registerButton);
  }

  async verifyRegistrationSuccess() {
    await expect(this.page.locator(registerLocators.resultMessage)).toContainText('Your registration completed');
  }

  async clickContinue() {
    await this.page.click(registerLocators.continueButton);
  }
}