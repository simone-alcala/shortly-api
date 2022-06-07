import bcrypt from  'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import db from './../database/connection.js';

dotenv.config();

export async function signUp (req,res){
  try {
    const user = req.body;
    const encryptedPassword = bcrypt.hashSync(user.password, 10);
    await db.query(`
      INSERT INTO users (name, email, password) VALUES ($1,$2,$3);`,
      [user.name.trim().toUpperCase(),user.email.trim().toUpperCase(),encryptedPassword]
    );
    res.sendStatus(201);
   } catch (e){
    console.log(e);
    return res.sendStatus(500); 
  }
}

export async function signIn (req,res){
  try {
    const user = req.body;

    const email = user.email.trim().toUpperCase();
   
    const result = await db.query(`SELECT id FROM users WHERE UPPER(email) = $1`,[email]);
    
    await db.query(`INSERT INTO sessions ("userId") VALUES ($1);`,[result.rows[0].id]);

    const session = await db.query(`SELECT max(id) as id FROM sessions WHERE "userId" = $1`,[result.rows[0].id]);

    const infoToken = { 
      userId: result.rows[0].id, 
      sessionId: session.rows[0].id 
    };

    const token = jwt.sign(infoToken, process.env.JWT_KEY);

    res.status(200).send( { token } );
    
   } catch (e){
    console.log(e);
    return res.sendStatus(500); 
  }

}