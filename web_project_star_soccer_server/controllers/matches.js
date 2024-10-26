const Match = require("../models/match");
const User = require("../models/user");

async function getMatchInfo(req, res, next) {
  try {
    const openMatch = await Match.findOne().populate("players").exec();

    res.send({ data: openMatch || {} });
  } catch (error) {
    next(error);
  }
}

async function createMatch(req, res, next) {
  const { date, time } = req.body;
  try {
    const newMatch = await Match.create({
      date,
      time,
    });

    res.send({ message: "Match created!", data: newMatch });
  } catch (error) {
    next(error);
  }
}

async function subscribeMatch(req, res, next) {
  const { matchId } = req.params;
  const { userId } = req.body;

  try {
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).send({ message: "Partida não encontrada" });
    }

    const userIsSubscribed = match.players.includes(userId);

    const updateOperation = userIsSubscribed
      ? { $pull: { players: userId } }
      : { $push: { players: userId } };

    const matchUpdated = await Match.findByIdAndUpdate(
      matchId,
      updateOperation,
      { new: true, useFindAndModify: false }
    ).populate("players");

    res.send({
      data: matchUpdated,
      message: userIsSubscribed
        ? "You've been unsubscribed!"
        : "You've been subscribed!",
    });
  } catch (error) {
    next(error);
  }
}

async function deleteMatch(req, res, next) {
  const { matchId } = req.params;
  try {
    await Match.findByIdAndDelete(matchId);

    res.send({ message: "Match closed!", data: {} });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getMatchInfo,
  createMatch,
  subscribeMatch,
  deleteMatch,
};
