require("dotenv").config();

const { Client } = require("pg");

console.log(process.env.DATABASE_URL);

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect()
  .then(() => {
    console.log("Connected to Neon!");
    return client.end();
  })
  .catch(err => {
    console.error(err);
  });