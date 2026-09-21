import { Page } from '@playwright/test';
import { signUpLocators } from '../locators/signUpLocators';

export class SignUpPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // The site shows the result in a browser alert, so we listen for it before clicking.
  async signUp(username: string, password: string) {
    await this.page.fill(signUpLocators.username, username);
    await this.page.fill(signUpLocators.password, password);

    const dialogPromise = this.page.waitForEvent('dialog');
    await this.page.click(signUpLocators.signUpButton);
    const dialog = await dialogPromise;

    const message = dialog.message();
    await dialog.accept();
    return message;
  }
}