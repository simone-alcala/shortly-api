/*import dotenv from 'dotenv';
import pg from 'pg';

const { Pool } = pg;

dotenv.config();

const db = new Pool({
  connectionString: process.env.DATABASE_URL
});

if (process.env.MODE === 'PROD') 
  db.ssl= { rejectUnauthorized: false };


export default db;*/
/*
import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();

const databaseConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
}

const db = new Pool(databaseConfig);

export default db;
*/

import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();

const databaseConfig = { connectionString: process.env.DATABASE_URL }
  
if (process.env.MODE === 'PROD') {
  databaseConfig.ssl = {
    rejectUnauthorized: false
  }
}

const db = new Pool(databaseConfig);

export default db;