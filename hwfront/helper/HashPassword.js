const JSON_WEBTOKEN_KEY = "Demo-auth-login-32";
const bcyprt = require("bcrypt");

const HashPassword = (password) => {
  const hashPassword = bcyprt.hashSync(password, 10);
  return hashPassword;
};

module.exports = { HashPassword };