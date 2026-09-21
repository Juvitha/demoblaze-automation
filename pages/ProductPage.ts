import { Page, expect } from '@playwright/test';
import { productLocators } from '../locators/productLocators';

export class ProductPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyProductPage(productName: string) {
    await expect(this.page.locator(productLocators.productName)).toHaveText(productName);
  }

  async verifyProductDetails() {
    await expect(this.page.locator(productLocators.productName)).toBeVisible();
    await expect(this.page.locator(productLocators.productPrice)).toContainText('$');
    await expect(this.page.locator(productLocators.addToCartButton)).toBeVisible();
  }

  // The page shows "$360 *includes tax". We return just the number 360.
  async getPrice() {
    const price = this.page.locator(productLocators.productPrice);
    await expect(price).toContainText('$');
    const text = await price.innerText();
    return Number(text.replace('$', '').split(' ')[0]);
  }

  // Add to cart shows a browser alert ("Product added"), so we listen for it.
  async addToCart() {
    const dialogPromise = this.page.waitForEvent('dialog');
    await this.page.click(productLocators.addToCartButton);
    const dialog = await dialogPromise;

    const message = dialog.message();
    await dialog.accept();
    return message;
  }
}