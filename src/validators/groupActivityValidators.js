
import joi from 'joi';

export  const createGroupActivityValidator=(groupActivity)=>{
    const createGroupValidatorSchema=joi.object({
        GroupID : joi.string().required(),
        description: joi.string().required(),
        activity_photo: joi.string().required(),
        UploadedByID: joi.string().required()
        })

    return createGroupValidatorSchema.validate(groupActivity);
}

