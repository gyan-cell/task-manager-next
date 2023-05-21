import { User } from "@/models/user";
import { connectDB, cookieSetter, generateToken } from "@/utils/features";
const { asyncError, errorHandler } = require("@/middlewares/error");
import bcrypt from 'bcrypt'

const handler = asyncError(async (req, res) => {
  await connectDB();
  if (req.method !== "POST") return errorHandler(res,400,"Only Post method is Allowed!")
  const { name, email, password } = req.body;
  let user = await User.findOne({email});
  if (!name || !email || !password)  return errorHandler(res, 400, "Please Enter All The Valid Details!")
  
  if (user) return errorHandler(res, 400, "User Already Exists With This Email!")
  
  const hashedPasswords = await bcrypt.hash(password,10)

  user = await User.create({
    name,
    email,
    password:hashedPasswords
  })
  const token = generateToken(user._id)
  cookieSetter(res, token, true)
  res.status(201).json({
    success: true,
    message: "Registered Successfully!",
    user
  })
})
//Scope essentially means where these variables are available for use. var declarations are globally scoped or function/locally scoped.

// The scope is global when a var variable is declared outside a function. This means that any variable 
// that is declared with var outside function block is available for use in the whole window.

// var is function scoped when it is declared within a function. This means that it is available
//
// and can be accessed only within that function.
// A block is a chunk of code bounded by {}. A block lives in curly braces. Anything within curly braces is a block.

// So a variable declared in a block with let  is only available 
// for use within that block. Let me explain this with an example:
export default handler
