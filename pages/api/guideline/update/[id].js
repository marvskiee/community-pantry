import dbConnect from "../../../../utils/dbConnect";
import Guideline from "../../../../models/Guideline";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "PUT":
      try {
        const update = await Guideline.findByIdAndUpdate(id, {
          guideline: req.body.guideline,
        });
        return res.status(201).json({ success: true, data: update });
      } catch (error) {
        res.status(400).json({
          success: false,
          errors: error,
        });
      }
    default:
      res.status(400).json({ success: false });
      break;
  }
};
