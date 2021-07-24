const bcrypt = require('bcrypt');
const UsersSchema = require('../models/user.model');
const UserDto = require('../dtos/user.dto');
const tokenService = require('./token.servie');

const registration = async (email, password) => {
  const candidate = await UsersSchema.findOne({ email });
  if (candidate) throw new Error('User has already exists');

  const hashPassword = await bcrypt.hash(password, parseInt(process.env.SALT, 10));
  const user = await UsersSchema.create({ email, password: hashPassword });
  const userDto = new UserDto(user);
  const tokens = tokenService.generateToken({ ...userDto });
  await tokenService.saveToken(userDto.id, tokens.refreshToken);

  return { tokens, userDto };
};

module.exports = {
  registration,
};
