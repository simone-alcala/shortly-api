import db from './../database/connection.js';
import { schemaUrlId , schemaUrlBody } from './../schemas/urlSchema.js';

export async function validateUrl (req,res,next) {
  
  try {
    
    const url = req.body;
    const validate = schemaUrlBody(url);

    if (validate.error) return res.status(422).send(validate.error.details.map(detail => detail.message));

    next();

  } catch (e){

    console.log(e);
    return res.sendStatus(500); 
  }

}

export async function validateId (req,res,next) {
  
  try {
    
    const url = req.params;
    const validate = schemaUrlId(url);

    if (validate.error) return res.status(422).send(validate.error.details.map(detail => detail.message));

    const id = parseInt(url.id);

    if (isNaN(id)) return res.status(422).send(`ID ${id} is not a number`);
    
    const result = await db.query(`SELECT * FROM urls WHERE id = $1`,[id]);

    if (res.locals.session !== undefined) {
      if (result.rows[0]?.userId !== res.locals.session.userId) return res.sendStatus(401);
    }

    if (result.rowCount === 0) return res.sendStatus(404);

    res.locals.url = result;

    next();

  } catch (e){

    console.log(e);
    return res.sendStatus(500); 
  }

}

