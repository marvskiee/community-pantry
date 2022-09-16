import dbConnect from "../../../utils/dbConnect";
import Story from "../../../models/Story";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const story = await Story.find();
        res.status(200).json({
          success: true,
          data: story,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        const story = await Story.create(req.body);
        res.status(201).json({ success: true, data: story });
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
