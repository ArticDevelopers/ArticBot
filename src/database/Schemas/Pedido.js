const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let pedidoSchema = new Schema({
    _id: {type: String, required: true},
    info: {
        idu: {type: String, default: "null"},
        nu: {type: String, default: "null"},
        date: {type: Number, default: 0},
        orcamento: {type: Boolean, default: true},
        cancelado: {type: Boolean, default: false},
        pago: {type: Boolean, default: false},
        entregue: {type: Boolean, default: false},
        messageid: {type: String, default: "null"},
        messageid2: {type: String, default: "null"},
    }
});

const Pedido = mongoose.model("Pedidos", pedidoSchema);
module.exports = Pedido;