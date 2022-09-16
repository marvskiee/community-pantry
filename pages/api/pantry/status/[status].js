import dbConnect from "../../../../utils/dbConnect";
import Pantry from "../../../../models/Pantry";

dbConnect();

export default async (req, res) => {
  const {
    query: { status },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const pantry = await Pantry.find({ status });
        res.status(200).json({
          success: true,
          data: pantry,
        });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
  }
};
