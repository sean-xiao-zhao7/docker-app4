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
pgClient
    .query("CREATE TABLE IF NOT EXISTS values (number INT)")
    .catch((err) => console.log(err));

// redis
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000,
});
const redisPublisher = redisClient.duplicate();

// Express router
app.get("/", (req, res) => {
    return res.send("Home");
});
app.get("/values/all", async (req, res) => {
    const values = await pgClient.query("SELECT * FROM values;");
    return res.send(values.rows);
});
app.get("/values/current", async (req, res) => {
    redisClient.hgetall("values", (err, values) => {
        return res.send(values);
    });
});
app.post("/values/new", async (req, res) => {
    const index = req.body.index;
    if (+index > 40) {
        return res.status(422).send("Index larger than 40.");
    } else {
        redisClient.hset("values", index, "No values.");
        redisPublisher.publish("insert", index);
        pgClient.query("INSERT INTO values(number) VALUES($1)", [index]);
        return res.send("Calculating Fibonacci.");
    }
});
app.listen(5000, (err) => {
    console.log("Listening on 5000.");
});
