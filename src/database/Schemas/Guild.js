const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let guildsSchema = new Schema({
    _id: {type: String, required: true },
    prefix: {type: String, default: "a."},
    cmdblock: {
        channels: {type: Array, default: [] },
        status: {type: Boolean, default: false},
    },
    name: {type: String, required: true},
});

let Guild = mongoose.model("Guilds", guildsSchema)
module.exports = Guild;