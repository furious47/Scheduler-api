const scheduleFilter = (user, filter) => {
  if (user instanceof Array) {
    const schedule = user.map((e) => {
      const { name, schedules } = e;
      const filtered = schedules.filter((e) => e.status === filter);
      if (filtered.length < 1) {
        return null;
      }
      const final = { name: name, schedules: filtered };

      return final;
    });
    return schedule;
  }

  const filtered = user.schedules.filter((e) => e.status === filter);
  const final = { name: e.name, schedules: filtered };
  return final;
};

module.exports = scheduleFilter;
