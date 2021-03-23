const Client = require('../../database/Schemas/Client');
const Command = require('../../database/Schemas/Command');
const Guild = require('../../database/Schemas/Guild');
const Pedido = require('../../database/Schemas/Pedido');
const User = require('../../database/Schemas/User');
module.exports = class {
    constructor(client) {
        this.client = client
    }

    async run () {
        this.client.database.client = Client;
        this.client.database.command = Command;
        this.client.database.guild = Guild;
        this.client.database.pedido = Pedido;
        this.client.database.user = User;
        
        const db = await this.client.database.client.findOne({_id: this.client.user.id})
        console.log(`Estou pronto. Users: ${this.client.users.cache.size}, comandos: ${this.client.commands.all.size}`)

        const status = [
         {
             name: `Dúvidas? Me mencione e saiba mais.`
         },
         {
             name: `Meus desenvolvedores são: Rickozin#4352 e zSpl1nterUS_#6455`
         },
         {
            name: `Artic Team official BOT`
         },
         {
            name: `Artic Team no topo`
         },
        ];
        setInterval(() => {
            var randomStatus = status[Math.floor(Math.random() * status.length)];
            this.client.user.setActivity(randomStatus.name)
            this.client.channels.cache.get('823659797936996432').edit({name: `Pedidos: ${db.lastpedido}`})
            this.client.channels.cache.get('823661361762533426').edit({name: `Pedidos fechados: ${db.pedidosfechados}`})
            this.client.channels.cache.get('823660377681821767').edit({name: `Orçamentos: ${db.lastorc}`})
            this.client.channels.cache.get('823661264634511380').edit({name: `Orçamentos fechados: ${db.orcsfechados}`})
        }, 10 * 1000);
        this.client.user.setStatus("online");
    }
}