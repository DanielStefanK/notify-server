const { Pool } = require("pg");

let pool;

const createPool = () => {
  pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: "5432"
  });
};

const getClient = () => {
  if (!pool) {
    throw new Error("Pool has not bee initialized");
  }
  return pool.connect();
};

module.exports = {
  createPool,
  getClient
};
