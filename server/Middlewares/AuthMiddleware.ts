import { User } from "../models/users";

function userVerification(req: any, res: any) {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }

  const jwt = require("jsonwebtoken");
  const JWT_SECRET_KEY = process.env.JWT_SECRET || console.log("ERROR");
  jwt.verify(token, JWT_SECRET_KEY, async (err: any, data: any) => {
    if (err) {
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
        return res.json({ status: false });
      }
    }
  });
}

export default userVerification;
