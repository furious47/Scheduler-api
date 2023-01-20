const customApiError = require("./customApiErr");

class noAuth extends customApiError {
  constructor(message) {
    super(message);
    this.StatusCode = 401;
  }
}

module.exports = noAuth;
