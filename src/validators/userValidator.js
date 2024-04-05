import joi from 'joi';

export const userRegistrationValidation = (user) => {
  const userRegistrationSchema = joi.object({
    Username: joi.string().required(),
    Email: joi.string().email().required(),
    Password: joi
      .string()
      .min(8) 
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/, 'password')
      .message(
        'Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one digit, and one special character.'
      )
      .required(),
    Location: joi.string().required(),
    TagName: joi.string().required(),
  });

  return userRegistrationSchema.validate(user);
};



export const userLoginValidation = (user) => {
  const userLoginSchema = joi.object({
    Email: joi.string().email().required(),
    Password: joi.string().required(),
    
  });

  return userLoginSchema.validate(user);
};



export  const updateUserValidator=(updateduser)=>{
  const updateUserValidatorSchema=joi.object({
      Username: joi.string().required(),
      TagName: joi.string().required(),
      Location: joi.string().required(),
      company_name: joi.string().required(),
      website_link: joi.string().required(),
      profileImage: joi.string().required(),
  })
   

  return updateUserValidatorSchema.validate(updateduser);
}



export  const updateUserPasswordValidator=(updateduser)=>{
  const updateUserPassValidatorSchema=joi.object({
      Password: joi.string().min(4).required(),
  })

  return updateUserPassValidatorSchema.validate(updateduser);
}
