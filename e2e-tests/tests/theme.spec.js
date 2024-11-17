const { test, expect } = require('@playwright/test');

test.describe('Theme Selection Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the game
        await page.goto('/');
        // Wait for the board and theme selector to be ready
        await page.waitForSelector('.board');
        await page.waitForSelector('#color-scheme');
    });

    test('should load with default autumn theme', async ({ page }) => {
        // Wait for theme to be applied
        await page.waitForSelector('body[data-theme="autumn"]');
        const theme = await page.evaluate(() => document.body.getAttribute('data-theme'));
        expect(theme).toBe('autumn');
    });

    test('should persist theme selection across page reloads', async ({ page }) => {
        // Select desert theme
        await page.selectOption('#color-scheme', 'desert');
        // Wait for theme to be applied
        await page.waitForSelector('body[data-theme="desert"]');
        
        // Verify theme is applied
        let theme = await page.evaluate(() => document.body.getAttribute('data-theme'));
        expect(theme).toBe('desert');

        // Reload page
        await page.reload();
        await page.waitForSelector('.board');
        await page.waitForSelector('body[data-theme="desert"]');

        // Verify theme persists
        theme = await page.evaluate(() => document.body.getAttribute('data-theme'));
        expect(theme).toBe('desert');
    });

    test('should apply correct colors for each theme', async ({ page }) => {
        const themes = ['autumn', 'desert', 'coffee', 'cherry', 'ocean', 'forest', 'lavender', 'moonlight'];
        
        for (const theme of themes) {
            // Select theme
            await page.selectOption('#color-scheme', theme);
            // Wait for theme to be applied
            await page.waitForSelector(`body[data-theme="${theme}"]`);
            
            // Get computed styles of first cell
            const cell = await page.locator('.cell').first();
            const computedStyle = await cell.evaluate((el) => {
                const styles = window.getComputedStyle(el);
                return {
                    backgroundColor: styles.backgroundColor,
                    color: styles.color
                };
            });

            // Verify styles are applied
            expect(computedStyle.backgroundColor).toBeTruthy();
            expect(computedStyle.color).toBeTruthy();

            // Verify gradient is applied
            const bodyGradient = await page.evaluate(() => {
                return window.getComputedStyle(document.body).background;
            });
            expect(bodyGradient).toContain('linear-gradient');
            expect(bodyGradient).toContain('rgb');
        }
    });

    test('should highlight winning cells with theme-specific background', async ({ page }) => {
        // Select X as player
        await page.selectOption('#player-symbol', 'X');
        await page.waitForTimeout(100);
        
        // Play winning sequence for X
        const moves = [
            [0, 0], [1, 0], // X, O
            [0, 1], [1, 1], // X, O
            [0, 2]          // X wins
        ];

        for (const [row, col] of moves) {
            await page.locator('.cell').nth(row * 3 + col).click();
            await page.waitForTimeout(200); // Increased wait time for AI move
        }

        // Wait for winning cells to be highlighted
        await page.waitForTimeout(500); // Wait for win animation
        await page.waitForSelector('.cell.winner');

        // Get winning cells and verify count
        const count = await page.locator('.cell.winner').count();
        expect(count).toBe(3);

        // Verify background color
        const winningCell = await page.locator('.cell.winner').first();
        const backgroundColor = await winningCell.evaluate((el) => {
            return window.getComputedStyle(el).backgroundColor;
        });
        expect(backgroundColor).toBe('rgb(193, 243, 215)');
    });

    test('should maintain theme colors during game play', async ({ page }) => {
        // Select desert theme
        await page.selectOption('#color-scheme', 'desert');
        await page.waitForSelector('body[data-theme="desert"]');

        // Play a few moves
        const moves = [[0, 0], [1, 1], [2, 2]];
        for (const [row, col] of moves) {
            await page.locator('.cell').nth(row * 3 + col).click();
            await page.waitForTimeout(100);
            
            // Verify theme is still applied
            const theme = await page.evaluate(() => document.body.getAttribute('data-theme'));
            expect(theme).toBe('desert');
        }
    });
});
