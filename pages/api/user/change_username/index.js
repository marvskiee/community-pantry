import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      const { password, new_username, _id } = req.body;
      try {
        const user = await User.findOneAndUpdate(
          { _id, password },
          { username: new_username },
          {
            runValidators: true,
          }
        ).select(["-password", "-__v", "-role"]);
        if (user) {
          return res.status(200).json({
            success: true,
            data: user,
          });
        }
        return res.status(400).json({
          success: false,
          errors: { passwordError: "Wrong password" },
        });
      } catch (error) {
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
