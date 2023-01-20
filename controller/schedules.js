const users = require("../model/user");
const data = require("../model/schedule");
const errors = require("../errors/index");
//utils
const scheduleFilter = require("../utils/scheduleFilter");
const isDateExist = require("../utils/isdateexist");

//This controller gets all open schedule
const getAllSchedule = async (req, res) => {
  const user = await users.find({}).populate("schedules");
  const openOnly = scheduleFilter(user, "open");
  if (openOnly[0] === null) {
    return res.status(200).json({ msg: "Currently no one posted schedules" });
  }

  res.status(200).json(openOnly);
};

//This controller creates a schedule
const createSchedule = async (req, res) => {
  const { date } = req.body;
  const { userID } = req.user;

  if (!date) {
    throw new errors.badReq("Please provide date");
  }

  const user = await users.findById(userID).populate("schedules");

  if (!user) {
    throw new errors.badReq(`No such user in this ${userID}`);
  }
  if (isDateExist(user.schedules, date)) {
    throw new errors.badReq("Already sceduled in this date and time");
  }
  const schedule = await data.create({ user: userID, date: date });
  user.schedules.push(schedule._id);
  await user.save();
  res.status(201).json(schedule);
};

//This controller books a schedule
const bookSchedule = async (req, res) => {
  const { id: scheduleID } = req.body;
  const { userID } = req.user;
  if (!userID) {
    return res.status(400).json({ msg: "Please provide scheduleID" });
  }

  let schedule = await data.findById(scheduleID);
  if (!schedule) {
    return res.status(400).json({ msg: `no schedule with id ${scheduleID}` });
  }
  if (schedule.status === "booked") {
    return res.status(400).json({ msg: `this schedule is already booked` });
  }

  schedule.status = "booked";
  schedule.bookedBy = userID;
  await schedule.save();
  res.status(200).json(schedule);
};

module.exports = {
  createSchedule,
  bookSchedule,
  getAllSchedule,
};

//for later update

// const oneUserSchedule = async (req, res) => {
//   const { id } = req.params;
//   if (!id) {
//     res.status(400).json({ msg: "Please provide id" });
//   }
//   const user = await users.findById(id).populate("schedules");
//   if (!user) {
//     res.status(404).json({ msg: `No user in thid id ${id}` });
//   }
//   const schedules = scheduleFilter(user, "open");
//   res.status(200).json(user);
// };
