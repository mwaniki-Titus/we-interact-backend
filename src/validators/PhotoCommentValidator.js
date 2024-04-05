import joi from "joi";

export const createPhotoCommentValidator = (Comment) => {
  const createPhotoCommentValidatorSchema = joi.object({
    Content: joi.string().required(),
  });

  return createPhotoCommentValidatorSchema.validate(Comment);
};