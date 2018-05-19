const { body, validationResult } = require('express-validator/check');

module.exports = {
  validate() {
    return [
      body('name').not().isEmpty().withMessage('O campo nome é obrigatório'),
      body('email').not().isEmpty().withMessage('O campo email é obrigatório'),
      body('email').isEmail().withMessage('Informe um email válido'),
      (request, response, next) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
          return response.status(422).json(errors.array());
        }

        return next();
      },
    ];
  },
};
