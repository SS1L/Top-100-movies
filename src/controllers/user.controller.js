const userService = require('../service/user.service');

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userData = await userService.login(email, password);

    res.status(200).json(userData);
  } catch (e) {
    res.json({ error: e.message });
  }
};

const registration = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userData = await userService.registration(email, password);

    res.status(200).json(userData);
  } catch (e) {
    res.json({ error: e.message });
  }
};

const logout = async (req, res) => {
  const refreshToken = req.headers.authorization;
  try {
    await userService.logout(refreshToken);

    res.json({ message: 'User logout' });
  } catch (e) {
    res.json({ error: e.message });
  }
};

// need fix
const refresh = async (req, res) => {
  const refreshToken = req.headers.authorization;
  try {
    const userData = await userService.refresh(refreshToken);

    res.json(userData);
  } catch (e) {
    res.json({ error: e.message });
  }
};

module.exports = {
  login,
  registration,
  logout,
  refresh,
};
