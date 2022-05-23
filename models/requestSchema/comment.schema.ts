import Joi from "joi";

const createCommentBody = Joi.object({
  comment: Joi.string().trim().required(),
});

export default {
  createCommentBody,
};
