import dbConnect from "../../../../utils/dbConnect";
import Story from "../../../../models/Story";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "PUT":
      try {
        const story = await Story.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (story) {
          return res.status(200).json({
            success: true,
            data: story,
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
