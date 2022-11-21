import dbConnect from "../../../utils/dbConnect";
import Metadata from "../../../models/Metadata";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const metadata = await Metadata.find();
        res.status(200).json({
          success: true,
          data: metadata,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const create = await Metadata.create(req.body);
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
