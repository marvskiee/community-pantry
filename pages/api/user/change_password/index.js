import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";
import bcrypt from "bcrypt";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      const { password, new_password, _id } = req.body;
      try {
        const old = await User.findById(_id);

        const decryptPassword = await bcrypt.compare(password, old.password);
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(new_password, salt);
        if (decryptPassword) {
          const user = await User.findByIdAndUpdate(
            { _id },
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
