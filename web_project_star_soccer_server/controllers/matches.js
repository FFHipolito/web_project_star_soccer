const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getMatchInfo(req, res, next) {
  try {
    const match = await prisma.match.findFirst({
      include: {
        players: true,
      },
    });

    if (match && match.players) {
      match.players.forEach((player) => (player.password = undefined));
    }

    res.send({ data: match || {} });
  } catch (error) {
    next(error);
  }
}

async function createMatch(req, res, next) {
  const { date, time } = req.body;
  try {
    const newMatch = await prisma.match.create({
      data: {
        date,
        time,
      },
    });

    res.send({ data: newMatch, message: "Match created successfully!" });
  } catch (error) {
    next(error);
  }
}

async function subscribeMatch(req, res, next) {
  const { matchId } = req.params;
  const userId = req.user._id;

  try {
    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: { players: true },
    });

    if (!match) {
      return res.status(404).send({ message: "Match not found!" });
    }

    const userIsSubscribed = match.players.some((p) => p.id === userId);

    const matchUpdated = await prisma.match.update({
      where: { id: matchId },
      data: {
        players: userIsSubscribed
          ? { disconnect: { id: userId } }
          : { connect: { id: userId } },
      },
      include: { players: true },
    });

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
    await prisma.match.delete({
      where: { id: matchId },
    });

    res.send({ data: {}, message: "Match closed!" });
  } catch (error) {
    if (error.code === 'P2025') {
       return res.status(404).send({ message: "Match not found." });
    }
    next(error);
  }
}

module.exports = {
  getMatchInfo,
  createMatch,
  subscribeMatch,
  deleteMatch,
};
