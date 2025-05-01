const authSchema = require("../schemas/AuthSchema");
const bcyprt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { HashPassword } = require("../helper/HashPassword");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
const getAuthController = async (req, res) => {
  const users = await authSchema.find().select("-password");
  if (users) {
    res.status(200).json({
      data: users,
    });
  } else {
    res.status(400).json({
      data: [],
    });
  }
};

const getAuthByIdController = async (req, res) => {
  const id = req.params?.id;
  try {
    const user = await authSchema
      .findById(id)
      .populate({
        path: "basket",
        populate: {
          path: "productId",
          model: "products",
        },
      })
      .select("-password"); // do not send password

    if (user) {
      res.status(200).json({
        data: user,
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const RegisterController = async (req, res) => {
  const { name, surname, password, email } = req.body;
  const EmailExsist = await authSchema.findOne({ email: email });
  if (EmailExsist) {
    return res.status(404).json({
      message: "e-mail is exsist",
    });
  }
  const hashPassword = HashPassword(password);
  const payload = {
    name: name,
    surname: surname,
    password: hashPassword,
    email: email,
  };
  const auth = new authSchema(payload);
  auth.save();
  res.status(201).json({
    data: {
      name: auth.name,
      surname: auth.surname,
      email: auth.email,
    },
  });
};

const AuthLoginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await authSchema.findOne({
    email: email,
  });
  if (user) {
    const isMatchuser = bcyprt.compareSync(password, user.password);
    if (isMatchuser) {
      const jwtToken = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: "1h",
      });
      res.cookie("login_jwt_token", jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000, 
      });
      return res.status(200).json({
        message: "Login successful",
        token: jwtToken,
        user: {
          id: user._id,
          name: user.name,
          surname: user.surname,
          email: user.email,
        },
      });
    }
  } else {
    return res.status(404).json({
      message: "User not found",
    });
  }
};

const AuthLogoutController = async (req, res) => {
  res.clearCookie("login_jwt_token");
  return res.status(200).json({
    message: "Logout successful",
  });
};

module.exports = {
  getAuthController,
  RegisterController,
  getAuthByIdController,
  AuthLoginController,
  AuthLogoutController,
};