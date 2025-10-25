import jwt from "jsonwebtoken";

export const authCheck = function (req, res, next) {
  try {
    const token = req.session.token;
    if (!token) {
      return res.status(401).json({ ok: false, message: "Unauthorized" });
    }
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (error) {
      return res.status(401).json({ ok: false, message: "Unauthorized" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
};

export const adminCheck = function (req, res, next) {
  if (!req.user.isAdmin) {
    return res.status(403).json({ ok: false, message: "Forbidden" });
  }
  next();
};
