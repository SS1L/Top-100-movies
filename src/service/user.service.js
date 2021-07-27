const bcrypt = require('bcrypt');
const UsersSchema = require('../models/user.model');
const UserDto = require('../dtos/user.dto');
const tokenService = require('./token.service');

const tokenEntry = async (user) => {
  const userDto = new UserDto(user);
  const tokens = tokenService.generateToken({ ...userDto });
  await tokenService.saveToken(userDto.id, tokens.refreshToken);

  return tokens;
};

const registration = async (email, password) => {
  const candidate = await UsersSchema.findOne({ email });
  if (candidate) throw new Error('User has already exists');

  const hashPassword = await bcrypt.hash(password, parseInt(process.env.SALT, 10));
  const user = await UsersSchema.create({ email, password: hashPassword });

  return { user };
};

const login = async (email, password) => {
  const userData = await UsersSchema.findOne({ email });
  if (!userData) throw new Error("Can't find user");

  const isPassEquals = bcrypt.compare(password, userData.password);
  if (!isPassEquals) throw new Error('Something went wrong');
  const entryPoint = await tokenEntry(userData);

  return entryPoint;
};

const logout = async (token) => {
  await tokenService.removeToken(token);
};

const refresh = async (refreshToken) => {
  if (!refreshToken) throw new Error('Don`t have refresh token');

  const userData = tokenService.validateRefreshToken(refreshToken);
  const tokenFromDb = await tokenService.findToken(refreshToken);

  if (!userData || !tokenFromDb) throw new Error('Something went wrong');
  const user = await UsersSchema.findById(userData.id);
  const entryPoint = await tokenEntry(user);

  return entryPoint;
};

module.exports = {
  registration,
  login,
  logout,
  refresh,
};
