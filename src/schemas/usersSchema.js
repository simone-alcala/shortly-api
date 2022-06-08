import joi from 'joi';

const options = {
  abortEarly:   false, 
  allowUnknown: true, 
  stripUnknown: true
};

export function schemaUrlId(user){
  
  const schema = joi.object({
    id: joi.string().trim().required()
  });

  return schema.validate(user,options);

}