import { test, expect } from '@playwright/test';

test.describe('Faith Model School CMS E2E Flow', () => {
  
  test('Admin can log in and seeded CMS pages load publicly', async ({ page }) => {
    // 1. Navigate to the Admin Login
    await page.goto('http://localhost:5500/admin/login');
    
    // 2. Expect the login page title to be present
    await expect(page.locator('h1')).toContainText('Faith Model');

    // 3. Log in with admin backdoor credentials
    await page.fill('input[type="email"]', 'admin@faithmodelschool.com');
    await page.fill('input[type="password"]', 'Admin123');
    await page.click('button[type="submit"]');

    // 4. Wait for redirect to admin dashboard
    await page.waitForURL('**/admin');
    await expect(page.locator('aside')).toBeVisible();

    // 5. Navigate directly to a seeded public page via the CMS
    await page.goto('http://localhost:5500/academics');
    
    // 6. Verify that the CMS-driven dynamic page loads correctly
    await expect(page.locator('h1')).toContainText('Academics');
    await expect(page.locator('p')).toContainText('Welcome to the Academics page');
    
    // 7. Check another dynamically routed page to ensure the catch-all [...slug] works
    await page.goto('http://localhost:5500/mandatory-disclosure');
    await expect(page.locator('h1')).toContainText('Mandatory Disclosure');
  });

});
