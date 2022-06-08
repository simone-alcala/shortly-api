import dotenv from 'dotenv';
import { nanoid } from 'nanoid';

import db from './../database/connection.js';

dotenv.config();

export async function createUrl (req,res){

  try {
    const  url  = req.body;

    const shortUrl = nanoid(8);

    await db.query(`
      INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1,$2,$3);`,
      [url.url.trim().toLowerCase(), shortUrl, res.locals.session.userId]
    );

    res.status(201).send( { shortUrl } );

   } catch (e){
    console.log(e);
    return res.sendStatus(500); 
  }
}

export async function getUrlById(req,res){
  try {
    
    const id = res.locals.url.rows[0].id;
    const shortUrl = res.locals.url.rows[0].shortUrl;
    const url = res.locals.url.rows[0].url;

    res.status(200).send( {id,shortUrl,url} );

   } catch (e){
    console.log(e);
    return res.sendStatus(500); 
  }
}

export async function deleteUrl(req,res){
  try {

    await db.query(` DELETE FROM urls WHERE id = $1 `, [res.locals.url.rows[0].id] );
    
    res.sendStatus(204);

   } catch (e){
    console.log(e);
    return res.sendStatus(500); 
  }
}