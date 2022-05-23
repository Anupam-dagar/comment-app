import Joi from "joi";

const authoriseSchema = Joi.object({
  createdby: Joi.string().trim().required(),
});

export default {
  authoriseSchema,
};
