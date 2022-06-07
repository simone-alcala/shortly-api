import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import db from './../database/connection.js';

dotenv.config();

export default async function validateSession (req,res,next) {

  try {

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer', '').trim();
    if (!token) return res.status(401).send('Invalid token');

    const infoSession = jwt.verify(token, process.env.JWT_KEY);

    const session = await db.query(`SELECT id,"userId" FROM sessions WHERE id = $1`,[infoSession.sessionId]);
      
    if (session.rowCount === 0 ) return res.sendStatus(401)

    res.locals.session = session.rows[0];

    next();
    
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  } 
}