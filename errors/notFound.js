const customApiErr = require("./customApiErr");

class notFound extends customApiErr {
  constructor(message) {
    super(message);
    this.StatusCode = 404;
  }
}

module.exports = notFound;
