const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let clientSchema = new Schema({
    _id: {type: String},
    cmdusos: {type: Number, default: 0},
    admins: {type: Array, default: []},
    devs: {type: Array, default: []},
    lastpedido: {type: Number, default: 0},
    lastorc: {type: Number, default: 0},
    staff:{
        owner: {type: Array, default: []},
        gerente: {type: Array, default: []},
        admin: {type: Array, default: []},
        moderador: {type: Array, default: []},
        suporte: {type: Array, default: []},
    },
    
    
});

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;