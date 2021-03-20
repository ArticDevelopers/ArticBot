const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let commandSchema = new Schema({
    _id: {type: String},
    usos: {type: Number, default: 0},
    cmdmanu: {type: Boolean, default: false},
    
});

let Command = mongoose.model("Commands", commandSchema);
module.exports = Command;