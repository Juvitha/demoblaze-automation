import { Page, expect } from '@playwright/test';
import { orderLocators } from '../locators/orderLocators';

export class OrderPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillOrderForm(order: any) {
    await this.page.fill(orderLocators.name, order.name);
    await this.page.fill(orderLocators.country, order.country);
    await this.page.fill(orderLocators.city, order.city);
    await this.page.fill(orderLocators.card, order.card);
    await this.page.fill(orderLocators.month, order.month);
    await this.page.fill(orderLocators.year, order.year);
  }

  async clickPurchase() {
    await this.page.click(orderLocators.purchaseButton);
    await expect(this.page.locator(orderLocators.confirmTitle)).toBeVisible({ timeout: 20000 });
  }

  async verifyPurchaseSuccess(expectedAmount: number) {
    await expect(this.page.locator(orderLocators.confirmTitle)).toHaveText('Thank you for your purchase!');
    await expect(this.page.locator(orderLocators.confirmDetails)).toContainText('Amount: ' + expectedAmount + ' USD');
  }

  async clickOk() {
    const okButton = this.page.locator(orderLocators.okButton);
    await expect(okButton).toBeVisible({ timeout: 20000 });
    await okButton.click();
    await this.page.waitForURL(/.*(index\.html|\/)?$/, { timeout: 20000 });
  }
}