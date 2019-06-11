var request = require('request');
var user = require('../../models/user_tbl');

describe('Login Feature', function () {
    it('verify UI of login GUI', function () {
        browser.waitForAngularEnabled(false);
        browser.get('http://localhost:3000');
        expect(element(by.xpath("//input[@id='email']")).isPresent()).toBe(true);
        expect(element(by.xpath("//input[@id='pass']")).isPresent()).toBe(true);
    });

    it('verify API for login', async function () {
        browser.waitForAngularEnabled(false);
        browser.get('http://localhost:3000');
        await element(by.xpath("//input[@id='email']")).sendKeys("huy@test.com");
        await element(by.xpath("//input[@id='pass']")).sendKeys("123456");
        await element(by.xpath("//button[@type='submit']")).click();
        expect(await browser.getCurrentUrl() == "http://localhost:3000/login").toBe(true);
    });

    it('verify API login with valid credential', async function () {
        var message;
        var options = {
            method: 'POST',
            url: 'http://localhost:3000/login',
            headers: {
                'cache-control': 'no-cache',
                'Content-Type': 'application/json'
            },
            body: {
                email: 'huy@test.com',
                pass: '123456'
            },
            json: true
        };
        await new Promise(function (fullfill, reject) {
            request(options, async function (error, response, body) {
                if (error) throw error;
                console.log(response.body.message);
                console.log(response.statusCode);
                message = response.body.message;
                fullfill( function() {
                }
                )
            })
        })
        expect(message).toEqual("valid login");
    });

    it('verify API login with missing parameter', async function (done) {
        var message;
        var options = {
            method: 'POST',
            url: 'http://localhost:3000/login',
            headers: {
                'cache-control': 'no-cache',
                'Content-Type': 'application/json'
            },
            body: {
                email: 'huy@test.com'
            },
            json: true
        };
        await request(options, async function (error, response, body) {
            console.log(response.body.message);
            console.log(response.statusCode);
            message = response.body.message;
            expect(message).toEqual("missing parameter");
            done();
        })
        
    });

    it('verify API login with invalid credential', async function (done) {
        var message;
        var options = {
            method: 'POST',
            url: 'http://localhost:3000/login',
            headers: {
                'cache-control': 'no-cache',
                'Content-Type': 'application/json'
            },
            body: {
                email: 'huy@test.com',
                pass: '12345678'
            },
            json: true
        };
        await request(options, async function (error, response, body) {
            console.log(response.body.message);
            console.log(response.statusCode);
            message = response.body.message;
            expect(message).toEqual("invalid login");
            done();
        })
        
    });

    it('verify valid credentail in user table', async function () {
        var message;
        await user.check("dmhuy@tma.com","123456").then(function (data) {
            message = data.message;
        })
        expect(message).toEqual("valid login");
    });

    it('verify invalid credentail in user table', async function () {
        var message;
        await user.check("huy@test.com","123456789").then(function (data) {
            message = data.message;
        })
        expect(message).toEqual("invalid login");
    });
});