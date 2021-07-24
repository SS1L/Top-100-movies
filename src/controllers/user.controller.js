const userService = require('../service/user.service');

const login = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
};

const registration = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userData = await userService.registration(email, password);

    res.cookie('refreshToken', userData.tokens.refreshToken);
    res.status(200).json(userData);
  } catch (e) {
    res.json({ error: e.message });
  }
};

const logout = (req, res) => {
  console.log('logout');
};

module.exports = {
  login,
  registration,
  logout,
};
