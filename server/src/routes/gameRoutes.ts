import express from "express";
import prisma from "../prismaClient";

const router = express.Router();

// Get all games for logged user
router.get("/", async (req, res) => {
  const game = await prisma.game.findMany({
    where: {
      user_id: req.userId,
    },
    orderBy: { id: "desc" },
  });
  res.json(game);
});

// Create new game
router.post("/", async (req, res) => {
  const { board, player, turn, game_result, game_ended } = req.body;
  const jsonString = JSON.stringify(board);

  const createGame = await prisma.game.create({
    data: {
      user_id: req.userId!,
      board: jsonString,
      player: player,
      turn: turn,
      game_result: game_result,
      game_ended: game_ended,
    },
  });

  res.json(createGame);
});

// Update game
router.put("/:id", async (req, res) => {
  const { board, turn, game_result, game_ended, player } = req.body;
  const jsonString = JSON.stringify(board);
  const { id } = req.params;

  const updateGame = await prisma.game.update({
    where: {
      id: parseInt(id),
      user_id: req.userId,
    },
    data: {
      board: jsonString,
      turn: turn,
      player: player,
      game_result: game_result,
      game_ended: !!game_ended,
    },
  });
  res.json(updateGame);
});

//Update game_result
router.put("/:id/result", async (req, res) => {
  const { game_result, game_ended } = req.body;
  const { id } = req.params;

  const updateGame = await prisma.game.update({
    where: {
      id: parseInt(id),
      user_id: req.userId,
    },
    data: {
      game_ended: !!game_ended,
      game_result: game_result,
    },
  });
  res.json(updateGame);
});

export default router;
