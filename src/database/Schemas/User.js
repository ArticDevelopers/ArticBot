const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    _id: {type: String, required: true},
    admin: {type: Boolean, default: false},
    developer: {type: Boolean, default: false},
    pedidos: {
        aberto: {type: Boolean, default: false},
        ids: {type: Array, default: []},
    },
    owner: {type: Boolean, default: false},
    name: {type: String, required: true}
});

const User = mongoose.model("Users", userSchema);
module.exports = User;