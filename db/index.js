const { Pool } = require("pg");
const proConfig = { connectionString: process.env.DATABASE_URL };
const pool = new Pool(process.env.NODE_ENV === "production" ? proConfig : null);
module.exports = {
  query: (text, params) => pool.query(text, params),
};
