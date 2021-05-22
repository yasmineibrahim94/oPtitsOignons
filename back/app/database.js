const { Pool } = require('pg');

// db est un pool de connecteurs de base de données
const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = db;