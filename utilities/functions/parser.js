import * as yup from 'yup';

export const parseRules = (rules) => {
  let schema;
  switch (rules.type) {
    case 'string':
      schema = yup.string().typeError(rules.typeError || 'Invalid type');
      break;
    case 'number':
      schema = yup.number().typeError(rules.typeError || 'Must be a number');
      if (rules.positive) schema = schema.positive('Must be a positive number');
      if (rules.integer) schema = schema.integer('Must be an integer');
      break;
    case 'date':
      schema = yup.date().typeError(rules.typeError || 'Invalid date');
      break;
    default:
      schema = yup.mixed();
  }

  if (rules.required) {
    schema = schema.required(rules.message || 'This field is required');
  }

  if (rules.nullable) {
    schema = schema.nullable();
  }

  return schema;
};
