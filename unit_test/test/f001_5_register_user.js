var request = require('request');
var user = require('../../models/user_tbl');

describe('Register User Feature', function () {
    it('verify UI of login GUI', async function () {
        browser.waitForAngularEnabled(false);
        browser.get('http://localhost:3000');
        await element(by.xpath("//a[@id='register']")).click();
        expect(await browser.getCurrentUrl() == "http://localhost:3000/register").toBe(true);
        expect(element(by.xpath("//input[@id='email']")).isPresent()).toBe(true);
        expect(element(by.xpath("//input[@id='pass']")).isPresent()).toBe(true);
        expect(element(by.xpath("//input[@id='pass_confirm']")).isPresent()).toBe(true);
        await element(by.xpath("//input[@id='email']")).sendKeys("dmhuy@tma.com");
        await element(by.xpath("//input[@id='pass']")).sendKeys("123456");
        await element(by.xpath("//input[@id='pass_confirm']")).sendKeys("123456789");
        expect(element(by.xpath("//button[@id='register']")).isEnabled()).toBe(false);
        await element(by.xpath("//input[@id='pass']")).clear();
        await element(by.xpath("//input[@id='pass']")).sendKeys("123456");
        await element(by.xpath("//input[@id='pass_confirm']")).clear();
        await element(by.xpath("//input[@id='pass_confirm']")).sendKeys("123456");
        await browser.sleep(1000);
        expect(element(by.xpath("//button[@id='register']")).isEnabled()).toBe(true);
        await element(by.xpath("//button[@id='register']")).click();
        expect(await browser.getCurrentUrl() == "http://localhost:3000/register").toBe(true);

    });

    it('verify API register - register success', async function (done) {
        var message;
        var options = {
            method: 'POST',
            url: 'http://localhost:3000/register',
            headers: {
                'cache-control': 'no-cache',
                'Content-Type': 'application/json'
            },
            body: {
                email: 'huy123@test.com',
                pass: '123456'
            },
            json: true
        };
        await request(options, async function (error, response, body) {
            console.log(response.body.message);
            console.log(response.statusCode);
            message = response.body.message;
            expect(message).toEqual("register successfully");
            done();
        })
    });

    it('verify duplicate emeil', async function () {
        var message;
        await user.register("huy@test.com","123456").then(function (data) {
            message = data.message;
        })
        expect(message).toEqual("duplicate email");
    });

    it('verify unique emeil', async function () {
        var message;
        await user.register("huy1@test.com","123456").then(function (data) {
            message = data.message;
        })
        expect(message).toEqual("register successfully");

        await user.delete("huy1@test.com").then(function (data) {
            message = data.message;
        })
        expect(message).toEqual("delete successfully");
    });

    it('verify delete account', async function () {
        var message;

        await user.delete("huy123@test.com").then(function (data) {
            message = data.message;
        })
        expect(message).toEqual("delete successfully");
    });

});