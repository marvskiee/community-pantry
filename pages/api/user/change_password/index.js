import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      const { password, new_password, _id } = req.body;
      try {
        const user = await User.findOneAndUpdate(
          { _id, password },
          { password: new_password },
          {
            new: true,
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
          errors: { oldPasswordError: "Wrong password" },
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          error: error,
        });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
