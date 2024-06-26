const Pool = require('pg-pool');

class DataBase {
    pool = null;
    instance = null;

    constructor() {
        this.pool = new Pool({
            user: process.env.USER_DB,
            host: process.env.HOST_DB,
            database: process.env.NAME_DB,
            password: process.env.PASSWORD_DB,
            port: process.env.PORT_DB,
        });
    }
  
} 

module.exports = DataBase;

