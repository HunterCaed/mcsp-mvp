const { Pool } = require('pg')
const dotenv = require('dotenv')
dotenv.config()


const client = new Pool({   //for local testing uncommint everything but connectionString
   connectionString: process.env.DATABASE_URL
}) //for live deployment uncomment connection string

module.exports = client; 