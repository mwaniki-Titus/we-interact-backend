import joi from "joi";

export const videoCategoryValidator = (videoCategory) => {
    const videoCategoryValidatorSchema = joi.object({
        categoryName: joi.string().required(),
        previewURL:joi.string().required(),
        createDate: joi.date().iso().default(new Date()),
    })
    return videoCategoryValidatorSchema.validate(videoCategory);
}