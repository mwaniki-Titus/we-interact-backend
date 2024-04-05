import Joi from 'joi';

export const photoValidator = (photo) => {
    const photoValidatorSchema = Joi.object({
        UserID: Joi.string().required(),
        PhotoURL: Joi.string().uri().required(),
        UploadDate: Joi.date().iso().required()
    });

    return photoValidatorSchema.validate(photo);
};
