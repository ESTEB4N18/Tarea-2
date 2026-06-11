const { z } = require('zod');

const includeSchema = z
  .enum(['summary', 'full'], {
    errorMap: () => ({ message: 'Parametro include invalido' })
  })
  .optional();

const searchSchema = z.string().min(3, {
  message: 'El texto debe tener al menos 3 caracteres'
});

module.exports = {
  includeSchema,
  searchSchema
};
