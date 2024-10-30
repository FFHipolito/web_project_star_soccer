const Match = require("../models/match");

async function getMatchInfo(req, res, next) {
  try {
    const match = await Match.findOne().populate("players").exec();

    // hide password propriety before sending
    if (match) match.players.forEach((player) => (player.password = undefined));

    res.send({ data: match || {} });
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

    if (!newMatch) {
      const err = new Error("Error creating match!");
      err.statusCode = 404;
      throw err;
    }

    res.send({ data: newMatch, message: "Match created successfully!" });
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
      return res.status(404).send({ message: "Match not found!" });
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

    // hide password propriety before sending
    matchUpdated.players.forEach((player) => (player.password = undefined));

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

    res.send({ data: {}, message: "Match closed!" });
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
