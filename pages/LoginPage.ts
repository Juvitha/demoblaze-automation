import { Page } from '@playwright/test';
import { loginLocators } from '../locators/loginLocators';

export class LoginPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async login(username: string, password: string) {
    await this.page.fill(loginLocators.username, username);
    await this.page.fill(loginLocators.password, password);
    await this.page.click(loginLocators.loginButton);
  }
}