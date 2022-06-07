import db from './../database/connection.js';
import { schemaSignUp } from './../schemas/authSchema.js';

export async function validateSignUp (req,res,next) {
  
  try {
    
    const user = req.body;
    const validate = schemaSignUp(user);

    if (validate.error) return res.status(422).send(validate.error.details.map(detail => detail.message));

    const email = user.email.trim().toUpperCase();
    
    const result = await db.query(`SELECT id FROM users WHERE UPPER(email) = $1`,[email]);

    if (result.rowCount > 0) return res.sendStatus(409);

    next();

  } catch (e){

    console.log(e);
    return res.sendStatus(500); 
  }

}


