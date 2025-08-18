import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  const secret = process.env.JWT_SECRET!;
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const { id } = decoded as { id: number };
    req.userId = id;
    next();
  });
}

export default authMiddleware;
