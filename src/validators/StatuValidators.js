
import joi from 'joi';

export  const createStatusValidator=(Status)=>{
    const createStatusValidatorSchema=joi.object({
        UserID: joi.string().required(),
        StatusText: joi.string().required(),
        ImagePath: joi.string().required()
    })

    return createStatusValidatorSchema.validate(Status);
}
 
 


export  const updateStatusValidator=(updatedStatus)=>{
    const updateStatusValidatorSchema=joi.object({
        StatusText: joi.string().required(),
        ImagePath: joi.string().required()

    })

    return updateStatusValidatorSchema.validate(updatedStatus);
}



