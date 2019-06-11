var request = require('request');
var user = require('../../models/user_tbl');

describe('Session Management', function () {

    fit('verify user should be redirected to Home after login success', async function () {
        browser.waitForAngularEnabled(false);
        browser.get('http://localhost:3000');
        await element(by.xpath("//input[@id='email']")).sendKeys("huy@test.com");
        await element(by.xpath("//input[@id='pass']")).sendKeys("123456");
        await element(by.xpath("//button[@type='submit']")).click();
        expect(await browser.getCurrentUrl() == "http://localhost:3000/home").toBe(true);
    });

    fit('verify user should be redirected to login after login failed', async function () {
        browser.waitForAngularEnabled(false);
        browser.get('http://localhost:3000');
        await element(by.xpath("//input[@id='email']")).sendKeys("huy@test.com");
        await element(by.xpath("//input[@id='pass']")).sendKeys("12345678");
        await element(by.xpath("//button[@type='submit']")).click();
        expect(await browser.getCurrentUrl() == "http://localhost:3000/login").toBe(true);
    });


});