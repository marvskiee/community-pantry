import dbConnect from "../../../utils/dbConnect";
import Guideline from "../../../models/Guideline";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const guideline = await Guideline.findOne();
        res.status(200).json({
          success: true,
          data: guideline,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const create = await Guideline.create({
          guideline: req.body.guideline,
        });
        return res.status(201).json({ success: true, data: create });
      } catch (error) {
        res.status(400).json({
          success: false,
          errors: error?.message,
        });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
