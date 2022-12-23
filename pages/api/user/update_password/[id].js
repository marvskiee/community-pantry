import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";
import bcrypt from "bcrypt";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const user = await User.findById(id);
        res.status(200).json({
          success: true,
          data: user,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const { password } = req.body;
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(password, salt);
        const user = await User.findByIdAndUpdate(
          { _id: id },
          {
            password: hashPassword,
          },
          {
            new: true,
            runValidators: true,
          }
        );
        if (user) {
          return res.status(200).json({ success: true });
        }
        return res
          .status(400)
          .json({ success: false, errors: ["Session expired"] });
      } catch (error) {
        console.log(error);
        const err = error.errors;
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
