import { test, expect } from '../fixtures/baseTest';
import testData from '../testdata/testData.json';
import { signUpAndLogin } from '../utils/loginUtil';
import { takeScreenshot } from '../utils/commonUtils';

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    await takeScreenshot(page, testInfo.title);
  }
});

test('E2E-03: Customer can find a product through category navigation and purchase it', async ({
  homePage, signUpPage, loginPage, productPage, cartPage, orderPage, user,
}) => {
  const data = testData.e2e03;

  // 1. Log in
  await signUpAndLogin(homePage, signUpPage, loginPage, user);

  // 2. Open a category and select a product
  await homePage.selectCategory(data.category);
  await homePage.openProduct(data.productName);

  // 3. Verify the product details
  await productPage.verifyProductPage(data.productName);
  await productPage.verifyProductDetails();
  const price = await productPage.getPrice();

  // 4. Add to cart
  expect(await productPage.addToCart()).toContain('Product added');

  // 5. Open the cart
  await homePage.openCart();
  await cartPage.verifyProductInCart(data.productName);
  await cartPage.verifyTotal(price);

  // 6. Place the order
  await cartPage.clickPlaceOrder();
  await orderPage.fillOrderForm(testData.order);
  await orderPage.clickPurchase();

  // 7. Verify the confirmation
  await orderPage.verifyPurchaseSuccess(price);
  await orderPage.clickOk();
  await homePage.verifyHomeShown();
});