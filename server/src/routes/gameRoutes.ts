import express from "express";
import db from "../db";

const router = express.Router();

// Get all games for logged user
router.get("/", (req, res) => {
  const getGame = db.prepare("SELECT * FROM game WHERE user_id =?");
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const game = getGame.all(req.userId);
  res.json(game);
});

// Create new game
router.post("/", (req, res) => {
  const { board, player, turn, game_result, game_ended } = req.body;
  const jsonString = JSON.stringify(board);
  const createGame = db.prepare(
    `INSERT INTO game (user_id, board,player, turn, game_result, game_ended) VALUES (?,?,?,?,?,?)`
  );
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const result = createGame.run(
    req.userId,
    jsonString,
    player,
    turn,
    game_result,
    game_ended
  );
  const id = result.lastInsertRowid;
  res.json({ id, jsonString, player, turn, game_result, game_ended: 0 });
});

// Update game
router.put("/:id", (req, res) => {
  const { board, turn, game_result, game_ended, player } = req.body;
  const jsonString = JSON.stringify(board);
  const { id } = req.params;

  const updatedGame = db.prepare(
    "UPDATE game SET board = ?,player=?, turn =?,game_result=?,game_ended=? WHERE ID = ?"
  );
  updatedGame.run(jsonString, player, turn, game_result, game_ended, id);
  res.json({ message: "Game updated" });
});

//Update game_result
router.put("/:id/result", (req, res) => {
  const { game_result, game_ended } = req.body;
  const { id } = req.params;

  const updateGame = db.prepare(
    "UPDATE game SET game_ended =?, game_result =? WHERE ID = ?"
  );
  updateGame.run(game_ended, game_result, id);
  res.json({ message: "Game result updated" });
});

export default router;
