import { test, expect } from '@playwright/test';
import { log } from 'node:console';
import exp from 'node:constants';

test('Test fetch cocktail info', async ({ page }) => {
    test.setTimeout(10_000)
    await page.goto(`file://${process.cwd()}/index.html`);

    let input = page.locator('#id');
    let button = page.getByRole('button');

    let requestPromise = page.waitForResponse('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007');
    await input.fill('11007');
    await button.click();
    await requestPromise;
    await expect(page.locator('h3')).toHaveText(/Margarita/);
    await expect(page.locator('h3')).toHaveText(/Ordinary Drink/);

    requestPromise = page.waitForResponse('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=17222');
    await input.fill('17222');
    await button.click();
    await requestPromise;
    await expect(page.locator('h3')).toHaveText(/A1/);
    await expect(page.locator('h3')).toHaveText(/Cocktail/);
});