const ClientEmbed = require("../../../structures/ClientEmbed");
const Command = require("../../../structures/Command");
const emojis = require("../../../utils/emojis");
const moment = require("moment");
const { MessageEmbed } = require("discord.js");
module.exports = class add extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "retornar";
    this.category = "Staff";
    this.description = "Retorna um orçamento (Somente para Responsável Orçamentos)";
    this.usage = "pedido proposta <id> <valor>";
    this.aliases = ["responder", "enviar", "proposta", "resposta"];
    this.reference = "pedido"

    this.enabled = true;
    this.staffOnly = true;
    this.guildOnly = true;
    this.sub = true
  }
  async run(message, args, prefix, author, channel) {
    moment.locale("pt-br");

    // Db's //
    const pdb = await this.client.database.pedido.findOne({
      _id: `orc${args[0]}`,
    });
    const dbclient = await this.client.database.client.findOne({
      _id: this.client.user.id,
    });

    if (!dbclient.staff.orc.find((x) => x == author.tag))
      return channel.send(
        `${emojis.errado} ¦ ${author}, somente orçamentistas podem passar orçamentos.`
      );

    if (!pdb)
      return channel.send(
        `${emojis.errado} ¦ ${author}, o orçamento de ID ${args[0]} não existe.`
      );

    if (pdb.info.orcamento.passado)
      return channel.send(
        `${emojis.errado} ¦ ${author}, esse orçamento já foi feito. Quem fez: **${pdb.info.orcamento.autor}**, valor passado: **R$ ${pdb.info.valor}**. Caso queira editar use **${prefix}pedido edit <id> <novo valor>**`
      );
    const value = args.slice(1).join(" ");

    const orcembed = new ClientEmbed(this.client.user)
      .setTitle(
        `Artic Team | Segue abaixo a resposta do seu orçamento:`,
        this.client.user.displayAvatarURL({ dynamic: true })
      )
      .addField(`ID do orçamento:`, pdb.info.idp)
      .addField(`Data de abertura:`, moment(pdb.info.date).format("DD/MM/YYYY"))
      .addField(`Valor do BOT:`, `R$ ${value}`)
      .addField(`Autor do orçamento:`, author.tag)
      .setDescription(
        `Para aceitar o orçamento digite **${prefix}pedido aceitar ${pdb._id}** no canal de comandos da Artic Team.`
      );

    const user = this.client.users.cache.get(pdb.info.idu);
    this.client.channels.cache
      .get(pdb.info.orcamento.cid)
      .send(`<@!${pdb.info.idu}>`, orcembed);
    const logchannel = this.client.channels.cache.get("823329561537150988");
    const oldmsg = logchannel.messages.fetch(pdb.messageid2);
    const newembed = new ClientEmbed(user)
      .setTitle(`${emojis.order} Novo orçamento:`)
      .addField(`Autor:`, pdb.info.nu)
      .addField(`ID:`, pdb.info.idp)
      .addField(`Última atualização:`, moment(Date.now()).format("LLL"))
      .addField(`**Status:**:`, `Aguardando Aprovação`)
      .setThumbnail(author.displayAvatarURL({ dynamic: true }));
    logchannel.messages.fetch(pdb.messageid2).then((message) => {
      const fetched = message.first();
      fetched.edit(newembed);
    });
    await this.client.database.pedido.findOneAndUpdate(
      { _id: `orc${args[0]}` },
      {
        $set: {
          "info.orcamento.passado": true,
          "info.valor": value,
          "info.orcamento.autor": author.tag,
        },
      }
    );

    channel.send(
      `${emojis.ok} ¦ ${author}, você enviou o orçamento no valor de **${value}** para o pedido de ID **${pdb.info.idp}**.`
    );
  }
};
