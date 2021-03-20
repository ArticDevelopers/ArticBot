const discord = require("discord.js");
const Command = require("../../structures/Command");
module.exports = class prefix extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "avatar";
    this.category = "Information";
    this.description = "Exibe o avatar de um usuário";
    this.usage = "avatar <user>";
    this.aliases = ["usericon", "useravatar"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run(message, args, prefix) {
    const user =
      this.client.users.cache.get(args[0]) ||
      message.mentions.users.first() ||
      message.author;

    let avatar = user.displayAvatarURL({
      format: "webp",
      dynamic: true,
      size: 2048,
    });
    let download = user.displayAvatarURL({ format: "jpeg", dynamic: true });

    const usavatar = new discord.MessageEmbed()
      .setAuthor(`Aqui está o avatar do usuário ${user.username}:`)
      .addFields({
        name: "<:download:805160478933254194> Download:",
        value: `\n Clique [aqui](${download}) para baixar o avatar`,
        inline: true,
      })
      .setImage(avatar)
      .setColor(process.env.EMBED_COLOR)
      .setTimestamp()
      .setFooter(
        `Por: ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      );
    message.channel.send(usavatar);
  }
};