import joi from "joi";

export const postValidator = (post) => {
  const postValidatorSchema = joi.object({
    UserID: joi.string().required(),
    content: joi.string().allow("").default("no content"),
    imageUrl: joi.string().allow(""),
    videoUrl: joi.string().allow(""),
    post_date: joi.date().iso().default(new Date()),
  });
  return postValidatorSchema.validate(post);
};
