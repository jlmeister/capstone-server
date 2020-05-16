const mysql = require('mysql')

class Connection {
  constructor() {
    if (!this.pool) {
      console.log('creating connection pool...')
      this.pool = mysql.createPool({
        connectionLimit: 100,
        host: process.env.LOCALDB_HOST,
        user: process.env.LOCALDB_USER,
        password: process.env.LOCALDB_PASSWORD,
        database: process.env.LOCALDB_SCHEMA
      })
      return this.pool;
    }
    return this.pool;
  }
}
// mysql://bb0854fbbda4f3:4985d4fa@us-cdbr-east-06.cleardb.net/heroku_c5c7735bfc50ff8?reconnect=true
const instance = new Connection();

module.exports = instance