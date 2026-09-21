import { test, expect } from '../fixtures/baseTest';
import testData from '../testdata/testData.json';
import { signUpAndLogin } from '../utils/loginUtil';
import { takeScreenshot } from '../utils/commonUtils';

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    await takeScreenshot(page, testInfo.title);
  }
});

test('INT-01: Product details and price on the product page match the cart', async ({
  homePage, signUpPage, loginPage, productPage, cartPage, user,
}) => {
  const data = testData.int01;

  // 1. Log in
  await signUpAndLogin(homePage, signUpPage, loginPage, user);

  // 2. Open a product and note its price
  await homePage.selectCategory(data.category);
  await homePage.openProduct(data.productName);
  await productPage.verifyProductPage(data.productName);
  const productPagePrice = await productPage.getPrice();

  // 3. Add to cart
  expect(await productPage.addToCart()).toContain('Product added');

  // 4. Open the cart and compare
  await homePage.openCart();
  await cartPage.verifyRowCount(1);
  await cartPage.verifyProductInCart(data.productName);

  const cartPrice = await cartPage.getProductPrice(data.productName);
  expect(cartPrice).toBe(productPagePrice);   // price is the same in both places
  await cartPage.verifyTotal(productPagePrice);   // total equals the price

  // (no checkout here: this test only checks product page -> cart)
});