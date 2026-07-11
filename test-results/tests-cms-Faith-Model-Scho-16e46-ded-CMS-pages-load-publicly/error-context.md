# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/cms.spec.ts >> Faith Model School CMS E2E Flow >> Admin can log in and seeded CMS pages load publicly
- Location: tests/cms.spec.ts:5:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Admin Panel')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Admin Panel')

```

```yaml
- link "Faith Model":
  - /url: /admin
- text: Campus Platform
- navigation:
  - link "Dashboard":
    - /url: /admin
  - link "CRM Leads":
    - /url: /admin/leads
  - link "Page Builder":
    - /url: /admin/pages
  - link "Blog Posts":
    - /url: /admin/posts
  - link "Gallery Media":
    - /url: /admin/media
  - link "Settings":
    - /url: /admin/settings
- text: S System Admin admin@faithmodelschool.com
- button "Sign Out"
- main:
  - heading "Welcome back, System Admin" [level=1]
  - paragraph: Here's what's happening on your campus platform today.
  - text: Total Enquiries 0 Published Pages 23 Blog Posts 0 Media Assets 0
  - heading "Recent Enquiries" [level=2]
  - text: No enquiries yet.
  - heading "Quick Actions" [level=2]
  - button "+ Add New Page"
  - button "+ Write a Blog Post"
  - button "+ Upload Gallery Images"
  - button "⚙️ Update Footer Settings"
- alert
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Faith Model School CMS E2E Flow', () => {
  4  |   
  5  |   test('Admin can log in and seeded CMS pages load publicly', async ({ page }) => {
  6  |     // 1. Navigate to the Admin Login
  7  |     await page.goto('http://localhost:5500/admin/login');
  8  |     
  9  |     // 2. Expect the login page title to be present
  10 |     await expect(page.locator('h1')).toContainText('Faith Model');
  11 | 
  12 |     // 3. Log in with admin backdoor credentials
  13 |     await page.fill('input[type="email"]', 'admin@faithmodelschool.com');
  14 |     await page.fill('input[type="password"]', 'Admin123');
  15 |     await page.click('button[type="submit"]');
  16 | 
  17 |     // 4. Wait for redirect to admin dashboard
  18 |     await page.waitForURL('**/admin');
> 19 |     await expect(page.locator('text=Admin Panel')).toBeVisible();
     |                                                    ^ Error: expect(locator).toBeVisible() failed
  20 | 
  21 |     // 5. Navigate directly to a seeded public page via the CMS
  22 |     await page.goto('http://localhost:5500/academics');
  23 |     
  24 |     // 6. Verify that the CMS-driven dynamic page loads correctly
  25 |     await expect(page.locator('h1')).toContainText('Academics');
  26 |     await expect(page.locator('p')).toContainText('Welcome to the Academics page');
  27 |     
  28 |     // 7. Check another dynamically routed page to ensure the catch-all [...slug] works
  29 |     await page.goto('http://localhost:5500/mandatory-disclosure');
  30 |     await expect(page.locator('h1')).toContainText('Mandatory Disclosure');
  31 |   });
  32 | 
  33 | });
  34 | 
```