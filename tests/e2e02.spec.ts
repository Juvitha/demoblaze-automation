import { test, expect } from '../fixtures/baseTest';
import testData from '../testdata/testData.json';
import { signUpAndLogin } from '../utils/loginUtil';
import { takeScreenshot } from '../utils/commonUtils';

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    await takeScreenshot(page, testInfo.title);
  }
});

test('E2E-02: Registered customer can purchase multiple products', async ({
  homePage, signUpPage, loginPage, productPage, cartPage, orderPage, user,
}) => {
  const data = testData.e2e02;

  // 1. Log in
  await signUpAndLogin(homePage, signUpPage, loginPage, user);

  // 2. Add product A
  await homePage.openProduct(data.productA);
  await productPage.verifyProductPage(data.productA);
  const priceA = await productPage.getPrice();
  expect(await productPage.addToCart()).toContain('Product added');

  // 3. Go back to the store and add product B
  await homePage.open();
  await homePage.openProduct(data.productB);
  await productPage.verifyProductPage(data.productB);
  const priceB = await productPage.getPrice();
  expect(await productPage.addToCart()).toContain('Product added');

  // 4. Open the cart and check both products and the total
  await homePage.openCart();
  await cartPage.verifyProductInCart(data.productA);
  await cartPage.verifyProductInCart(data.productB);
  await cartPage.verifyRowCount(2);
  await cartPage.verifyTotal(priceA + priceB);

  // 5. Place the order
  await cartPage.clickPlaceOrder();
  await orderPage.fillOrderForm(testData.order);
  await orderPage.clickPurchase();

  // 6. Verify the confirmation
  await orderPage.verifyPurchaseSuccess(priceA + priceB);
  await orderPage.clickOk();
  await homePage.verifyHomeShown();
});