import db from './../database/connection.js';

export async function getUserById (req,res){
  try {

    const { id } = req.params;
    
    const user = await db.query(`
         SELECT U.id, U.name, SUM(COALESCE(R."visitCount",0)) AS "visitCount"
           FROM users U
      LEFT JOIN urls R ON U.id = R."userId"
          WHERE U.id = $1
       GROUP BY U.id, U.name`, [id] );

    const shortenedUrls = await db.query(`
        SELECT id, "shortUrl", url, "visitCount"
          FROM urls 
         WHERE "userId" = $1
      ORDER BY id`, [id] );   

    const result = {
      id: user.rows[0].id,
      name: user.rows[0].name,
      visitCount: user.rows[0].visitCount,
      shortenedUrls: shortenedUrls.rows
    };

    res.status(200).send( result );

   } catch (e){
    console.log(e);
    return res.sendStatus(500); 
  }
}

export async function getUsersRanking (req,res){
  try {

    const user = await db.query(`
        SELECT U.id, U.name, COUNT (R.id) AS "linksCount", SUM(COALESCE(R."visitCount", 0)) AS "visitCount"
          FROM users U
     LEFT JOIN urls R ON U.id = R."userId"      
      GROUP BY U.id, U.name
      ORDER BY 4 DESC , 3 DESC , 2 , 1
         LIMIT 10` );

    res.status(200).send(user.rows);

  } catch (e) {
    res.sendStatus(500);
    console.log(e);
  }
}