import dbConnect from "../../../../utils/dbConnect";
import Pantry from "../../../../models/Pantry";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const pantry = await Pantry.find({ status: "approved", user_id: id });
        res.status(200).json({
          success: true,
          data: pantry,
        });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
  }
};
