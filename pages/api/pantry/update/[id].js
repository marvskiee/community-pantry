import dbConnect from "../../../../utils/dbConnect";
import Pantry from "../../../../models/Pantry";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "PUT":
      try {
        const pantry = await Pantry.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (pantry) {
          return res.status(200).json({
            success: true,
            data: pantry,
          });
        }
        return res
          .status(400)
          .json({ success: false, errors: ["Session expired"] });
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
