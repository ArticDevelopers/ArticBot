const ClientEmbed = require('../../../structures/ClientEmbed')
const Command = require("../../../structures/Command");
const emojis = require("../../../utils/emojis");
const moment = require('moment');
const { MessageEmbed } = require('discord.js');
module.exports = class add extends Command {
    constructor(client) {
      super(client);
      this.client = client;
  
      this.name = "retornar";
      this.category = "Miscellaneous";
      this.description = "Retorna um orçamento";
      this.usage = "pedido add";
      this.aliases = ["responder", "enviar", "proposta"];
      this.reference = "pedido"
  
      this.enabled = true;
      this.guildOnly = true;
      this.sub = true
    }
    async run(message, args, prefix, author, channel) {
        moment.locale("pt-br")

        // Db's //
        const pdb = await this.client.database.pedido.findOne({_id: `orc${args[0]}`})
        const dbclient = await this.client.database.client.findOne({_id: this.client.user.id})

        if(!dbclient.staff.orc.find((x) => x == author.tag)) return channel.send(`${emojis.errado} ¦ ${author}, somente orçamentistas podem passar orçamentos.`)
         
        if(!pdb) return channel.send(`${emojis.errado} ¦ ${author}, o orçamento de ID ${args[0]} não existe.`)

        const value = args.slice(1).join(" ")

        const orcembed = new ClientEmbed(this.client.user)
        .setTitle(`Artic Team | Segue abaixo a resposta do seu orçamento:`. this.client.user.displayAvatarURL({dynamic: true}))
        .addField(`ID do orçamento:`, pdb.id)
        .addField(`Data de abertura:`, moment(pdb.date).format("DD MM YYYY, hh:mm:ss"))
        .addField(`Valor do BOT:`, `R$ ${value}`)
        .setDescription(`Para aceitar o orçamento digite **${prefix}pedido aceitar ${pdb._id}** no canal de comandos da Artic Team.`)
        
        const user = this.client.users.cache.get(pdb.info.idu)
        user.send(`Seu orçamento foi atualizado:`, orcembed).catch((err) => {
            this.client.channels.cache.get('823329599693520926').send(`<@!${pdb.info.idu}> tentei enviar seu orçamento em sua DM mas não consegui, seu orçamento está no canal do seu orçamento.`)
            this.client.channels.cache.get(pdb.channelid).send(`<@!${pdb.ifno.idu}>`, orcembed)
        })
        const logchannel = this.client.channels.cache.get('823329561537150988')
        const oldmsg = logchannel.messages.fetch(pdb.messageid2)
        const oldembed = oldmsg.then((x) => x.embeds[0])
        const newembed = new MessageEmbed(oldembed).setDescription(`**Status:** \nAguardando aprovação.`)
        oldmsg.edit(newembed)

    }
}