import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";

dbConnect();

export default async (req, res) => {
  const {
    method,
    query: { id },
  } = req;
  switch (method) {
    case "GET":
      try {
        const user = await User.findById(id);
        if (user) {
          return res.status(200).json({
            success: true,
            data: user,
          });
        }
        res.status(400).json({ success: false });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
