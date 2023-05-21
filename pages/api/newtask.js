import { asyncError, errorHandler } from "@/middlewares/error";
import { Task } from "@/models/task";
import { checkAuth, connectDB } from "@/utils/features";

const handler = asyncError(

  async (req, res) => {

    if (req.method !== "POST") return errorHandler(res, 400, "Only Post method is Allowed!")

    connectDB();


    const { title, description } = req.body;
    if (!title || !description) return errorHandler(res,401,"Please Enter All Fields!")
    const user = await checkAuth(req)
    await Task.create({
      title,
      description,
      user: user._id
    })
    res.json({
      success: true,
      message: "Task Created"
    })
  }
)

export default handler
