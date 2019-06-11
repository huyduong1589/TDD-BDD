const Cryptr = require('cryptr');
const cryptr = new Cryptr('itIsVerySecret');

var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'dmhuy',
    password: '123456',
    database: 'ci_cd',
    port: 3306
});
var users = [];
connection.connect();

exports.check = function(user,pass){
    return new Promise(async function (fulfill, reject){
        await connection.query('SELECT * from user where email = "'+ user +'"', function (err, rows, fields){
            if (err) reject(err);
            if (rows.length > 0 & cryptr.decrypt(rows[0].pass) == pass) {
                console.log("DUNG ROI, CHO QUA DI!!!")
                fulfill({
                    "message":"valid login"
                })
            }
            else {
                console.log("CHUA CO DUNG!!!!")
                fulfill({
                    "message":"invalid login"
                })
            }
        })
    })
}

exports.register = function(user,pass){
    return new Promise(async function (fulfill, reject){
        var encryptPass = cryptr.encrypt(pass);
        await connection.query('SELECT * from user where email = "'+ user +'"', async function (err, rows, fields){
            if (err) reject(err);
            if (rows.length > 0) {
                fulfill({
                    "message":"duplicate email"
                })
            }
            else {
                await connection.query('INSERT INTO user (email,pass) VALUES ("'+ user +'","'+ encryptPass +'")', function (err, rows, fields){
                    if (err) reject(err);
                    else fulfill({"message":"register successfully"})
                })
            }
        })
    })
}

exports.delete = function(user){
    return new Promise(async function (fulfill, reject){
        await connection.query('DELETE from user where email = "'+ user +'"', function (err, rows, fields){
            if (err) reject(err);
            else {
                fulfill({
                    "message":"delete successfully"
                })
            }
        })
    })
}