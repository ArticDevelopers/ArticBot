const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let pedidoSchema = new Schema({
    _id: {type: String, required: true},
    info: {
        idu: {type: String, default: "null"},
        nu: {type: String, default: "null"},
        idp: {type: String, default: "null"},
        date: {type: Number, default: 0},
        orcamento: {
            ativo: {type: Boolean, default: true},
            passado: {type: Boolean, default: false},
            aprovado: {type: Boolean, default: false},
            cid: {type: String, default: "null"},
            recusado: {
                true: {type: Boolean, default: false},
                  reason: {type: String, default: "null"}
              },
            autor: {type: String, default: "null"}
        },
        cancelado: {type: Boolean, default: false},
        pago: {type: Boolean, default: false},
        valor: {type: String, default: "null"},
        entregue: {type: Boolean, default: false},
        messageid: {type: String, default: "null"},
        messageid2: {type: String, default: "null"},
        
    }
});

const Pedido = mongoose.model("Pedidos", pedidoSchema);
module.exports = Pedido;