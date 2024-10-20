import fs from 'fs';
import pg from 'pg';

const config = {
    user: "avnadmin",
    password: "AVNS_RFEmJuXRP9v7DvMIwpD",
    host: "pg-walmart-bot-walmart.k.aivencloud.com",
    port: "28810",
    database: "defaultdb",
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync('./ca.pem').toString(),
    },
};
const pool = new pg.Pool(config);

export const getAll = async () => {
    try {
        const client = await pool.connect();

        const pgResponse = await client.query(
            'select * from documents'
        );

        client.release();

        return pgResponse.rows;
    } catch (error) {
        console.error("Error processing request:", error);
        throw new Error("Failed to fetch recommendations");
    }
};
