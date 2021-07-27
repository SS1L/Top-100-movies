const tokenService = require('../service/token.service');

const validationUser = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) throw new Error('Something went wrong');
    const token = authorizationHeader.split(' ')[1];
    const validToken = tokenService.validateAccessToken(token);
    if (!validToken) throw new Error('Someting went wrong');

    req.user = validToken;
    next();
  } catch (e) {
    res.json(e.message);
  }
};

module.exports = validationUser;
