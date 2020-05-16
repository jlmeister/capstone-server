const mysql = require('mysql')

class Connection {
  constructor() {
    if (!this.pool) {
      console.log('creating connection pool...')
      this.pool = mysql.createPool({
        connectionLimit: 100,
        // host: 'us-cdbr-east-06.cleardb.net',
        // user: 'bb0854fbbda4f3',
        // password: '4985d4fa',
        // database: 'heroku_c5c7735bfc50ff8'
        host: '127.0.0.1',
        user: 'jordan',
        password: 'password',
        database: 'address_it'
      })
      return this.pool;
    }
    return this.pool;
  }
}
// mysql://bb0854fbbda4f3:4985d4fa@us-cdbr-east-06.cleardb.net/heroku_c5c7735bfc50ff8?reconnect=true
const instance = new Connection();

module.exports = instance