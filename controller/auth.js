const auth = require("../model/user");
//errors
const errors = require("../errors/index");
//utils
const { createToken, tokenVerify } = require("../utils/jwt");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new errors.badReq("Provide all values");
  }
  const data = await auth.create({ ...req.body });
  const User = { userID: data._id, name: data.name };
  const token = createToken({ payload: User });
  res.status(201).json({ ...User, token: token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new errors.badReq("Provide all values");
  }

  const user = await auth.findOne({ email: email });
  if (!user) {
    throw new errors.notFound("No user registered with Email Id");
  }

  const isPassword = await user.comparePassword(password);
  if (!isPassword) {
    throw new errors.noAuth("Invalid Password");
  }
  const data = { userID: user._id, name: user.name };
  const token = createToken({ payload: data });
  res.status(200).json({ ...data, token });
};

module.exports = { register, login };
