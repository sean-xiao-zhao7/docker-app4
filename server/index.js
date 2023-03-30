const keys = require("./keys");
const redis = require("redis");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// PG
const { Pool } = require("pg");
const pgClient = new Pool({
    user: keys.pgUser,
    password: keys.pgPassword,
    host: keys.pgHost,
    database: keys.pgDatabase,
    port: keys.pgPort,
});
pgClient.on("error", (error) => {
    console.log(error);
});

// const redisClient = redis.createClient({
//     host: keys.redisHost,
//     port: keys.redisPort,
//     retry_strategy: () => 1000,
// });
