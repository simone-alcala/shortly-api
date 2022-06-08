import db from './../database/connection.js';
import { schemaUrlId  } from './../schemas/usersSchema.js';

export async function validateId (req,res,next) {
  
  try {
    
    const user = req.params;
    const validate = schemaUrlId(user);

    if (validate.error) return res.status(422).send(validate.error.details.map(detail => detail.message));

    const id = parseInt(user.id);

    if (isNaN(id)) return res.status(422).send(`ID ${id} is not a number`);
    
    const result = await db.query(`SELECT * FROM users WHERE id = $1`,[id]);

    if (result.rowCount === 0) return res.sendStatus(404);

    next();

  } catch (e){

    console.log(e);
    return res.sendStatus(500); 
  }

}