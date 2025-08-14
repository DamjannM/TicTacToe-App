import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db";
import { secureHeapUsed } from "crypto";

const router = express.Router();

//REGISTER
router.post("/register", (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const insertUser = db.prepare(`INSERT INTO users (email, password)
        VALUES (?, ?)`);
    const result = insertUser.run(email, hashedPassword);

    //creating token
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not set");
    }
    const token = jwt.sign({ id: result.lastInsertRowid }, secret, {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
      res.sendStatus(503);
    }
  }

  res.sendStatus(201);
});
//LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const getUser = db.prepare("SELECT * FROM users WHERE email = ?");
  const user = getUser.get(email);

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  const passwordIsValid = bcrypt.compareSync(password, String(user.password));
  if (!passwordIsValid) {
    return res.status(401).send({ message: "Invalid password" });
  }
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }
  const token = jwt.sign({ id: user.id }, secret, {
    expiresIn: "24h",
  });
  console.log(user);
  res.json({ token });
});

export default router;
