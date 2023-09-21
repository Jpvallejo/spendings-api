const pgCon = require('pg')
const PGUSER = 'USER'
const PGDATABASE = 'localhost'
const config = {
    user: process.env.DATABASE_USERNAME,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    dialect: "postgres",
    port: 5432,
  };
let connectionPool = new pgCon.Pool(config);

module.exports = connectionPool;