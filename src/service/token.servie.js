const jwt = require('jsonwebtoken');
const TokenSchema = require('../models/token.model');

const generateToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {expiresIn: '30m'});
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: '30d'});
  return { accessToken, refreshToken };
};

const saveToken = async (userId, refreshToken) => {
  const tokenData = await TokenSchema.findOne({ user: userId });
  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }

  const token = await TokenSchema.create({ user: userId, refreshToken });
  return token;
};

module.exports = {
  generateToken,
  saveToken,
};
