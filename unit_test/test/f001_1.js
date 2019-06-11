describe('express should run on port 3000', function() {
    it('verify port 3000', async function() {
        browser.waitForAngularEnabled(false);
        browser.get('http://localhost:3000');
        expect(await browser.getTitle() == 'TDD Demo').toBe(true);
    });
  });