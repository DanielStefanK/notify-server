const { Pool } = require("pg");

let pool;

const createPool = () => {
  pool = new Pool({
    host: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}${process.env.DB_HOST}/${process.env.DB_NAME}`
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
