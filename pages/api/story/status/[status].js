import dbConnect from "../../../../utils/dbConnect";
import Story from "../../../../models/Story";

dbConnect();

export default async (req, res) => {
  const {
    query: { status },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const story = await Story.find({ status });
        res.status(200).json({
          success: true,
          data: story,
        });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
  }
};
