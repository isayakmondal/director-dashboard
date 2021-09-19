import jwt, { decode } from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  const token = req.header("x-access-token");
  if (!token) return res.status(401).send("Access Denied");

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(400).json({ auth: false, message: "Invalid Token" });
    } else {
      req.id = decoded.id;
      next();
    }
  });
};
