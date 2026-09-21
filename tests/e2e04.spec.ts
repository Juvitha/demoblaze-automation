import { test, expect } from '../fixtures/baseTest';
import testData from '../testdata/testData.json';
import { signUpAndLogin } from '../utils/loginUtil';
import { takeScreenshot } from '../utils/commonUtils';

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    await takeScreenshot(page, testInfo.title);
  }
});

test('E2E-04: Customer can remove a product from the cart and purchase the remaining one', async ({
  homePage, signUpPage, loginPage, productPage, cartPage, orderPage, user,
}) => {
  const data = testData.e2e04;

  // 1. Log in
  await signUpAndLogin(homePage, signUpPage, loginPage, user);

  // 2. Add product A
  await homePage.openProduct(data.productA);
  await productPage.verifyProductPage(data.productA);
  expect(await productPage.addToCart()).toContain('Product added');

  // 3. Add product B
  await homePage.open();
  await homePage.openProduct(data.productB);
  await productPage.verifyProductPage(data.productB);
  const priceB = await productPage.getPrice();
  expect(await productPage.addToCart()).toContain('Product added');

  // 4. Open the cart, both products are there
  await homePage.openCart();
  await cartPage.verifyProductInCart(data.productA);
  await cartPage.verifyProductInCart(data.productB);
  await cartPage.verifyRowCount(2);

  // 5. Delete product A
  await cartPage.deleteProduct(data.productA);
  await cartPage.verifyProductNotInCart(data.productA);
  await cartPage.verifyRowCount(1);

  // 6. The total is now only the price of product B
  await cartPage.verifyTotal(priceB);

  // 7. Place the order for the remaining product
  await cartPage.clickPlaceOrder();
  await orderPage.fillOrderForm(testData.order);
  await orderPage.clickPurchase();

  // 8. Verify the confirmation
  await orderPage.verifyPurchaseSuccess(priceB);
  await orderPage.clickOk();
  await homePage.verifyHomeShown();
});