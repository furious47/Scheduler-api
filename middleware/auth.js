const { tokenVerify } = require("../utils/jwt");
const errors = require("../errors/index");

const authentication = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    throw new errors.noAuth("No token provided");
  }

  const token = header.split(" ")[1];

  try {
    const user = tokenVerify(token);
    req.user = { userID: user.userID, name: user.name };
    next();
  } catch (error) {
    console.log(error);
    throw new errors.noAuth("Invalid Token");
  }
};

module.exports = authentication;
