import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient";

const router = express.Router();

//REGISTER
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    if (!user) {
      res.status(404).send({ message: "User already exists" });
    }
    //creating 1st default game
    const board = ["", "", "", "", "", "", "", "", ""];
    const boardJSON = JSON.stringify(board);
    const player = "X";
    const turn = "X";
    const game_result = "In progress";
    await prisma.game.create({
      data: {
        user_id: user.id,
        board: boardJSON,
        player,
        turn,
        game_result,
      },
    });
    //creating token
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not set");
    }
    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (error: any) {
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      return res.status(400).send({ message: "User already exists" });
    }

    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});
//LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

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
