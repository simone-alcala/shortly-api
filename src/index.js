import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import router from './routers/index.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(router);

const port = process.env.PORT || 4000 ;

app.listen( port, () => {
  console.log(`Mode: ${process.env.MODE}` || 'DEV' );
  console.log (`Server running on ${port}`);
});