const { Router } = require("express");
const router = Router();
//middleware
const auth = require("../middleware/auth");
//controller
const {
  createSchedule,
  bookSchedule,
  getAllSchedule,
} = require("../controller/schedules");

router.route("/").get(getAllSchedule);
router.route("/schedule").post(auth, createSchedule).patch(auth, bookSchedule);

module.exports = router;
