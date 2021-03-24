const emojis = require("../../utils/emojis");
const { MessageEmbed } = require('discord.js')
const Command = require("../../structures/Command");
module.exports = class prefix extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "embed";
    this.category = "Staff";
    this.description = "Comando para criar embeds";
    this.usage = "embed <author/title>";
    this.aliases = ["eb"];
    this.reference = "embed"
    this.subs = ["author", "title"]

    this.enabled = true;
    this.guildOnly = true;
    this.ownerOnly = false
    this.staffOnly = true
  }
  async run(message, args, prefix, author, channel) {
      const doc = await this.client.database.client.findOne({_id: this.client.user.id})
    // Verifica se o usuário é staff //
    if(!doc.staff.owner.find((x) => x == author.tag)) {
        if(!doc.staff.gerente.find((x) => x == author.tag)) {
            if(!doc.staff.admin.find((x) => x == author.tag)) {
                return channel.send(`${emojis.errado} ¦ ${author}, você precisa ser um admin ou superior para usar esse comando.`)
            }
        }
    }
    const subs =
    args[0] &&
    this.client.commands.subcommands
      .get(this.reference)
      .find(
        (cmd) =>
          cmd.name.toLowerCase() === args[0].toLowerCase() ||
          cmd.aliases.includes(args[0].toLowerCase())
      );
      if(!subs) return channel.send(`${emojis.errado} ¦ ${author}, você precisa informar se é uma author embed ou uma title embed.`)
      subs.run(message, args, prefix, author, channel)
  }
}