import bcrypt from  'bcrypt';

import db from './../database/connection.js';
import { schemaSignIn } from './../schemas/authSchema.js';

export async function validateSignIn (req,res,next) {
  
  try {
    
    const user = req.body;
    const validate = schemaSignIn(user);

    if (validate.error) return res.status(422).send(validate.error.details.map(detail => detail.message));

    const email = user.email.trim().toUpperCase();
   
    const result = await db.query(`SELECT email, password FROM users WHERE UPPER(email) = $1`,[email]);

    if (result.rowCount === 0) return res.sendStatus(401);

    if ( !bcrypt.compareSync(user.password,result.rows[0].password) ) return res.sendStatus(401);

    next();

  } catch (e){

    console.log(e);
    return res.sendStatus(500); 
  }

}


