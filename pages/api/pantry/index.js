import dbConnect from "../../../utils/dbConnect";
import Pantry from "../../../models/Pantry";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const pantry = await Pantry.find().sort({ created_at: -1 });
        res.status(200).json({
          success: true,
          data: pantry,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        const pantry = await Pantry.create(req.body);
        res.status(201).json({ success: true, data: pantry });
      } catch (error) {
        res.status(400).json({
          success: false,
          errors: error,
        });
      }

      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
