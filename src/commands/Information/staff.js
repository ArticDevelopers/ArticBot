const emojis = require("../../utils/emojis");
const Command = require("../../structures/Command");
const ClientEmbed = require('../../structures/ClientEmbed')
module.exports = class prefix extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "staff";
    this.category = "Information";
    this.description = "Lista de staffs"
    this.usage = "staffs";
    this.aliases = ["staffs", "stf", "suporte"];

    this.enabled = true;
    this.guildOnly = true;
    this.ownerOnly = false
  }
  async run(message, args, prefix, author, channel) {
    const doc = await this.client.database.client.findOne({_id: this.client.user.id})
    const stafflist = new ClientEmbed(author)
    .setAuthor(`Lista de staffs da Artic Team`, this.client.user.displayAvatarURL({dynamic: true}))
    .addField(`CEOs`, !doc.staff.owner.length ? "Nenhum CEO" : doc.staff.owner.map((x) => `\`${x}\``).join(", "))
    .addField(`Gerentes:`, !doc.staff.gerente.length ? "Nenhum Gerente" : doc.staff.gerente.map((x) => `\`${x}\``).join(", "))
    .addField(`Administradores:`, !doc.staff.admin.length ? "Nenhum Administrador" : doc.staff.admin.map((x) => `\`${x}\``).join(", "))
    .addField(`Moderadores:`, !doc.staff.moderador.length ? "Nenhum Moderador" : doc.staff.moderador.map((x) => `\`${x}\``).join(", "))
    .addField(`Suportes:`, !doc.staff.suporte.length ? "Nenhum Suporte" : doc.staff.suporte.map((x) => `\`${x}\``).join(", "))
    .setThumbnail(message.guild.iconURL({dynamic: true}))
    channel.send(`${author}, aqui está a lista de staffs.`, stafflist)
  }
}