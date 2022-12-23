import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";
import bcrypt from "bcrypt";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      const { password, new_username, _id } = req.body;
      try {
        const old = await User.findById(_id);
        console.log("usr:", new_username);

        const decryptPassword = await bcrypt.compare(password, old.password);
        console.log(decryptPassword);
        if (decryptPassword) {
          const user = await User.findByIdAndUpdate(
            { _id },
            {
              username: new_username,
            },
            {
              new: true,
              runValidators: true,
            }
          );
          console.log(user);
          if (user) {
            return res.status(200).json({ success: true });
          }
        }
        return res.status(400).json({
          success: false,
          errors: { passwordError: "Wrong password" },
        });
      } catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          errors: error.code && { usernameError: "Username already exist" },
        });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
