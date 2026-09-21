import { Page, expect } from '@playwright/test';
import { cartLocators } from '../locators/cartLocators';

export class CartPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyProductInCart(productName: string) {
    await expect(this.page.locator(cartLocators.rows, { hasText: productName })).toHaveCount(1);
  }

  async verifyProductNotInCart(productName: string) {
    await expect(this.page.locator(cartLocators.rows, { hasText: productName })).toHaveCount(0);
  }

  async verifyRowCount(count: number) {
    await expect(this.page.locator(cartLocators.rows)).toHaveCount(count);
  }

  async getProductPrice(productName: string) {
    const priceCell = this.page.locator(cartLocators.rows, { hasText: productName }).locator('td').nth(2);
    await expect(priceCell).toHaveText(/\d+/);
    return Number(await priceCell.innerText());
  }

  async verifyTotal(expectedTotal: number) {
    await expect(this.page.locator(cartLocators.total)).toHaveText(String(expectedTotal));
  }

  async deleteProduct(productName: string) {
    await this.page.locator(cartLocators.rows, { hasText: productName }).locator('a', { hasText: 'Delete' }).click();
  }

  async clickPlaceOrder() {
    await this.page.click(cartLocators.placeOrderButton);
  }
}