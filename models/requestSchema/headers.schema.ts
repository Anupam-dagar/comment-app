import Joi from "joi";

const authoriseSchema = Joi.object({
  user: Joi.string().trim().required(),
});

export default {
  authoriseSchema,
};
