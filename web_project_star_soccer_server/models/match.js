const mongoose = require("mongoose");
const { SchemaTypes, model } = mongoose;

const matchSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  players: {
    type: [{ type: SchemaTypes.ObjectId, ref: "user" }],
    default: [],
  },
});

module.exports = model("match", matchSchema);
