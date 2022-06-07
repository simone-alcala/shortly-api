import joi from 'joi';

const options = {
  abortEarly:   false, 
  allowUnknown: true, 
  stripUnknown: true
};

export function schemaUrlId(req,res,next){
  
  const url = req.params;

  const schema = joi.object({
    id: joi.string().trim().required()
  });

  const validate = schema.validate(url,options);
  
  if (validate.error) {
    return res.status(422).send(validate.error.details.map(detail => detail.message));
  }  

  next();

}

export function schemaUrlBody(req,res,next){
  
  const url = req.body;

  const schema = joi.object({
    url: joi.string().trim().uri().required()
  });

  const validate = schema.validate(url,options);
  
  if (validate.error) {
    return res.status(422).send(validate.error.details.map(detail => detail.message));
  }  

  next();

}
