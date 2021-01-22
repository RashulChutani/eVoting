const mongoose = require("mongoose");

const ContractSchema = new mongoose.Schema({
    address: String,
});

// compile model from schema
module.exports = mongoose.model("contract", ContractSchema);