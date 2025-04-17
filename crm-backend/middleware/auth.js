import jwt from "jsonwebtoken";
import User from "../models/user.model.js"

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Access denied, no token sior bhalk" });
  }


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded?.userId
    })

    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
