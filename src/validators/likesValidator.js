import joi from "joi";

export const likesValidator = (likes) => {
  const likeValidatorSchema = joi.object({
    UserID: joi.string().required(),
    post_id: joi.string().required(),
    like_date: joi.date().iso().default(new Date()),
  });
  return likeValidatorSchema.validate(likes);
};
