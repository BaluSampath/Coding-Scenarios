// @ts-nocheck
const { test, expect } = require('@playwright/test');

test('Verify the title of the application', async ({ page }) => {
  //load url in the browser
  await page.goto('https://www.moneycorp.com/en-gb/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Moneycorp/);
  // Click on the Language and region button 
  await page.locator('button[id="language-dropdown-flag"]').click();
  // Select USA from the list of options display
  await page.getByRole('link', { name: 'USA English' }).click();
  // Validate the URL
  await expect(page).toHaveURL('https://www.moneycorp.com/en-us/');
  // Click on Find out more button from Foreign exchange solutions
  await page.locator('(//span[@class="ignoreScrollEvents"])[11]').click();
  // Validate the page redirect
  await expect(page.locator('h1[class*="u-text-display"]')).toHaveText('Foreign exchange solutions for your business');
  // Search "international payments" from the search box
  await page.locator('(//input[@id="nav_search"])[2]').type('international payments');
  // Click on search
  await page.locator('(//input[@type="submit"])[2]').click()
  // Assert International payment in the search result is visible
  await expect(page.locator('input[value="international payments"]')).toBeVisible();
  // Get the attribute value and perform the assertion to validate "en-us" was in all anchor tags
  const inputElement = await page.locator('a[class="title u-m-b2"]');
  const value = await inputElement.getAttribute('href');
  await expect(value).toHaveText('/en-us/')
});
