import joi from "joi";

export const videoValidator = (video) => {
    const videoValidatorSchema = joi.object({
        UserID: joi.string().required(),
        videoURL: joi.string().allow(""),
        videoCaption: joi.string().allow(""),
        UploadDate: joi.date().iso().default(new Date()),
    })
    return videoValidatorSchema.validate(video);
}