import Joi from "joi";

const createCommentBody = Joi.object({
  comment: Joi.string().trim().required(),
  parentId: Joi.number(),
});

export default {
  createCommentBody,
};
