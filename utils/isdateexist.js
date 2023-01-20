const isDateExist = (schedule, date) => {
  let result;
  schedule.forEach((e) => {
    if (e.date === date) {
      result = true;
    }
  });
  return result;
};

module.exports = isDateExist;
