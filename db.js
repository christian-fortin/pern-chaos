const Pool = require("pg").Pool;
const pool = new Pool({
    user: "christianfortin",
    // password?
    host: "localhost",
    port: 5432,
    database: "pernchaos"
})

module.exports = pool;