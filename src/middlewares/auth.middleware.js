const validationUser = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) throw new Error('Something went wrong');
    next();
  } catch (e) {
    return next(e);
  }
};

module.exports = validationUser;
