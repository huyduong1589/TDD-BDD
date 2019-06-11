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


describe('Database Testing', function() {
    it('password should be encrypted in DB', async function(done) {
        var decryptedString;
        await connection.query('SELECT * from user where email = "dmhuy@abc.com"', function (err, rows, fields){
            if (err) {
                console.log("ERROR --- " + err);
                reject(err);
            }
            else {
                console.log("PASSWORD --- " + rows[0].pass);
                decryptedString = cryptr.decrypt(rows[0].pass);
                console.log("DECRYPTED PASSWORD --- " + decryptedString);
                expect(decryptedString == '123456').toBe(true);
                done();
            }
        }) 
    });
  });