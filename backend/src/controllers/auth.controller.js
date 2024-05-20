import * as userServices from "../services/user.service.js";

export const login = async (req, res) => {
  try {
    const { userlogin } = req.body;
    const user = await userServices.login(userlogin);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { username, email, role } = req.body;
    const user = await userServices.register({ username, email, role });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
