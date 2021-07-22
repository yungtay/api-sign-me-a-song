import pg from "pg";

const { Pool } = pg;

const connection = new Pool({
    user: "postgres",
    password: "123456",
    database: "singsong",
    host: "localhost",
    port: 5432,
});

export default connection;