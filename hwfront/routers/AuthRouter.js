const router = require("express").Router();
const {
  getAuthController,
  RegisterController,
  getAuthByIdController,
  AuthLoginController,
  AuthLogoutController,
} = require("../controllers/AuthController");

router.get("/", getAuthController);
router.get("/:id", getAuthByIdController);
router.post("/register", RegisterController);
router.post("/login", AuthLoginController);
router.post("/logout", AuthLogoutController);

module.exports = router;