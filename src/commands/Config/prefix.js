const emojis = require("../../utils/emojis");
const Command = require("../../structures/Command");
module.exports = class prefix extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "prefix";
    this.category = "Config";
    this.description = "Comando para configurar o prefix do bot";
    this.usage = "prefix";
    this.aliases = ["prefixo"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run(message, args, prefix, author, channel) {
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return channel.send(
        `${emojis.errado} ¦ ${author}, você precisa da permissão **MANAGE_GUILDS** para alterar o prefixo do bot.`
      );
    let newPrefix = args[0];
    const doc = await this.client.database.guild.findOne({
      _id: message.guild.id,
    });

    if (!newPrefix) {
      return channel.send(
        `${emojis.errado} ¦ ${author}, você precisa inserir um prefixo novo para ser alterado.`
      );
    } else if (newPrefix.length > 5) {
      return channel.send(
        `${emojis.errado} ¦ ${author}, o tamanho máximo do prefixo é 5 caractéres.`
      );
    } else if (newPrefix == doc.prefix)
      return channel.send(
        `${emojis.errado} ¦ ${author}, o prefixo precisa ser diferente do usado atualmente.`
      );
    channel.send(
      `${emojis.ok} ¦ ${author}, o prefixo foi alterado para **${newPrefix}**`
    );
    await doc.updateOne({ $set: { prefix: newPrefix } });
  }
};
