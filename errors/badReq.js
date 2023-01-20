const customApiError = require("./customApiErr");

class badReq extends customApiError {
  constructor(message) {
    super(message);
    this.StatusCode = 400;
  }
}

module.exports = badReq;
