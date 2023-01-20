const { Router } = require("express");
const router = Router();
//controller
const { register, login } = require("../controller/auth");

router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;
