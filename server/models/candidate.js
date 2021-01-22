const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({
    address: String,
    name: String,
    party: String,
    symbol: String,
});

// compile model from schema
module.exports = mongoose.model("candidate", CandidateSchema);