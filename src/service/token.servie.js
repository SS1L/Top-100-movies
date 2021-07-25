const jwt = require('jsonwebtoken');
const TokenSchema = require('../models/token.model');

const generateToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '30m' });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: '30d' });
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

const removeToken = async (refreshToken) => {
  await TokenSchema.deleteOne({ refreshToken });
};

const validateRefreshToken = (refreshToken) => {
  try {
    const userData = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
    return userData;
  } catch (e) {
    return null;
  }
};

const findToken = async (refreshToken) => {
  const tokenData = await TokenSchema.findOne({ refreshToken });
  return tokenData;
};

module.exports = {
  generateToken,
  saveToken,
  removeToken,
  validateRefreshToken,
  findToken,
};
