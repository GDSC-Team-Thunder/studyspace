import { User } from "../models/users";

function userVerification(req: any, res: any) {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    console.log("haha");
    return res.json({ status: false });
  }

  const jwt = require("jsonwebtoken");
  const JWT_SECRET_KEY = process.env.JWT_SECRET || console.log("ERROR");
  jwt.verify(token, JWT_SECRET_KEY, async (err: any, data: any) => {
    if (err) {
      console.log("mohta");
      return res.json({ status: false });
    } else {
      const user = await User.findById(data._id);
      if (user)
        return res.json({
          status: true,
          user: user.username,
          userid: user._id,
        });
      else {
        console.log("aaryan");
        return res.json({ status: false });
      }
    }
  });
}

export default userVerification;
