require("dotenv").config();
const app = require("./src/app");
const pool = require("./src/pool");

const port = process.env.PORT || 3005;

pool
  .connect({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  })
  .then(() => {
    app().listen(port, () => console.log(`http://localhost:3005`));
  })
  .catch((err) => console.log(err));
