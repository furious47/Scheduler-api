const jwt = require("jsonwebtoken");

const createToken = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};

const tokenVerify = (token) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  return payload;
};

module.exports = { createToken, tokenVerify };
