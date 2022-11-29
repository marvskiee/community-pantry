import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const user = await User.find();
        res.status(200).json({
          success: true,
          data: user,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      const { username, email, password, confirmPassword } = req.body;
      let newError = {};
      if (username?.trim() == "" || username == undefined) {
        newError = { ...newError, usernameError: "Please enter username!" };
      }
      if (
        !email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ) {
        newError = {
          ...newError,
          emailError: "Please enter valid email address!",
        };
      }
      if (
        password.length < 8 ||
        password?.trim() == "" ||
        password == undefined
      ) {
        newError = {
          ...newError,
          passwordError:
            "Please enter password and must be atleast 8 characters!",
        };
      }
      if (
        confirmPassword?.trim() == "" ||
        password?.trim() == "" ||
        confirmPassword == undefined ||
        password == undefined ||
        confirmPassword?.trim() != password?.trim()
      ) {
        newError = { ...newError, confirmPasswordError: "Password mismatch!" };
      }
      if (Object.keys(newError).length > 0) {
        res.status(400).json({
          success: false,
          errors: newError,
        });
      } else {
        try {
          const user = await User.create(req.body);
          res.status(201).json({ success: true, data: user });
        } catch (error) {
          console.log(error);
          if (error.code === 11000 && error.keyPattern?.username) {
            newError = {
              ...newError,
              usernameError: "Username already exist!",
            };
          }
          if (error.code === 11000 && error.keyPattern?.email) {
            newError = {
              ...newError,
              emailError: "Email already exist!",
            };
          }
          res.status(400).json({
            success: false,
            errors: newError,
          });
        }
      }

      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
