const { connectionString } = require("pg/lib/defaults");

const Pool = require("pg").Pool;
require("dotenv").config();

// const devConfig = {
//     user: process.env.PG_USER,
//     // password?
//     host: process.env.PG_HOST,
//     port: process.env.PG_PORT,
//     database: process.env.PG_DATABASE
// }

const devConfig = `postgresql://${process.env.PG_USER}:@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const proConfig = {
    connectionString: process.env.DATABASE_URL // comes from heroku addons
}
console.log(proConfig);

const pool = new Pool({
    connectionString:
    process.env.NODE_ENV === "production" ? process.env.DATABASE_URL : devConfig,
    ssl: { rejectUnauthorized: false }
});

module.exports = pool;

