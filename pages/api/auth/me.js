import { User } from "@/models/user";
import { checkAuth, connectDB, cookieSetter, generateToken } from "@/utils/features";
const { asyncError, errorHandler } = require("@/middlewares/error");
import bcrypt from 'bcrypt'

const handler = asyncError(async (req, res) => {
  if (req.method !== "GET")
    return errorHandler(res, 400, "Only GET Method is allowed");

  const user = await checkAuth(req);

  if (!user) return errorHandler(res, 401, "Login First");

  res.status(200).json({
    success: true,
    user,
  });
});

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
