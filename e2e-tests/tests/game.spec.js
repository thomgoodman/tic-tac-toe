const { test, expect } = require('@playwright/test');

test.describe('Tic Tac Toe Game', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the game board', async ({ page }) => {
    await expect(page.locator('#board')).toBeVisible();
    // Wait for board to be populated with cells
    await page.waitForSelector('.cell');
    const cells = await page.locator('.cell').count();
    expect(cells).toBe(9);
  });

  test('should allow player to make a move', async ({ page }) => {
    await page.locator('.cell').first().click();
    await expect(page.locator('.cell').first()).toHaveText('X');
  });

  test('should show AI move after player move', async ({ page }) => {
    await page.locator('.cell').first().click();
    // Wait for AI move
    await page.waitForTimeout(1000);
    const filledCells = await page.locator('.cell:not(:empty)').count();
    expect(filledCells).toBe(2);
  });

  test('should track score', async ({ page }) => {
    // Initial scores should be 0
    await expect(page.locator('#wins')).toHaveText('0');
    await expect(page.locator('#losses')).toHaveText('0');
    await expect(page.locator('#draws')).toHaveText('0');
  });

  test('should allow difficulty selection', async ({ page }) => {
    // Select each difficulty level
    const difficulties = ['easy', 'medium', 'hard'];
    for (const difficulty of difficulties) {
      await page.selectOption('#difficulty', difficulty);
      const selected = await page.$eval('#difficulty', el => el.value);
      expect(selected).toBe(difficulty);
    }
  });

  test('should reset game when reset button clicked', async ({ page }) => {
    // Make some moves
    await page.locator('.cell').first().click();
    await page.waitForTimeout(1000);
    
    // Click reset
    await page.locator('#reset').click();
    
    // Check all cells are empty
    const cells = await page.locator('.cell').all();
    for (const cell of cells) {
      await expect(cell).toBeEmpty();
    }
  });

  test('should reset score history', async ({ page }) => {
    // Make some moves to potentially get scores
    await page.locator('.cell').first().click();
    await page.waitForTimeout(1000);
    
    // Reset history
    await page.locator('#reset-history').click();
    
    // Check scores are reset
    await expect(page.locator('#wins')).toHaveText('0');
    await expect(page.locator('#losses')).toHaveText('0');
    await expect(page.locator('#draws')).toHaveText('0');
  });

  test('should allow player symbol selection', async ({ page }) => {
    // Select O as player symbol
    await page.selectOption('#player-symbol', 'O');
    const selected = await page.$eval('#player-symbol', el => el.value);
    expect(selected).toBe('O');
    
    // AI should make first move as X
    await page.waitForTimeout(1000);
    const filledCells = await page.locator('.cell:not(:empty)').count();
    expect(filledCells).toBe(1);
  });
});
