const dotenv = require("dotenv");
const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

dotenv.config();
console.log(process.env);

const {
  registerValidation,
  loginValidation,
} = require("../routes/validation/validation");

router.post("/register", async (req, res) => {
  // validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //   email exists check
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  // Generating a hash
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //   creating a new user in database
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.json({ user: user._id });
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/login", async (req, res) => {
  // validation
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //   email exists check
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is not registered");
  //   mathcing the password with the one stored in db
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Password doesn't mathch.");

  //   const TOKENSECERET = "fdfd";
  //   creating and assigining a jwt token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECERET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
