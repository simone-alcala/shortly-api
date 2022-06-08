import joi from 'joi';

const options = {
  abortEarly:   false, 
  allowUnknown: true, 
  stripUnknown: true
};

export function schemaUrlId(url){
  
  const schema = joi.object({
    id: joi.string().trim().required()
  });

  return schema.validate(url,options);

}

export function schemaUrlBody(url){

  const schema = joi.object({
    url: joi.string().trim().uri().required()
  });

  return schema.validate(url,options);

}


export function schemaShortUrl(url){

  const schema = joi.object({
    shortUrl: joi.string().trim().required()
  });

  return schema.validate(url,options);

}