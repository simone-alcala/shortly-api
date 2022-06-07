import joi from 'joi';

const options = {
  abortEarly:   false, 
  allowUnknown: true, 
  stripUnknown: true
};

export function schemaSignUp(user){

  const schema = joi.object({
    name: joi.string().trim().required(),
    email: joi.string().trim().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.ref('password')
  }).with('password', 'confirmPassword');

  return schema.validate(user,options);

}

export function schemaSignIn(user){

  const schema = joi.object({
    email: joi.string().trim().email().required(),
    password: joi.string().required()
  });

  return schema.validate(user,options);

}