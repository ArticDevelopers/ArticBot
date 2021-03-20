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
        
        console.log(`Estou pronto. Users: ${this.client.users.cache.size}, comandos: ${this.client.commands.size}`)

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
         {
             name: `ovo na puta que pariu`
         }
        ];
        setInterval(() => {
            var randomStatus = status[Math.floor(Math.random() * status.length)];
            this.client.user.setActivity(randomStatus.name)
        }, 10 * 1000);
        this.client.user.setStatus("online");
    }
}