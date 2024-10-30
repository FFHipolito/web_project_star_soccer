const router = require("express").Router();
const {
  getMatchInfo,
  createMatch,
  subscribeMatch,
  deleteMatch,
} = require("../controllers/matches");

router.get("/match", getMatchInfo);
router.post("/match", createMatch);
router.put("/match/:matchId", subscribeMatch);
router.delete("/match/:matchId", deleteMatch);

module.exports = router;
