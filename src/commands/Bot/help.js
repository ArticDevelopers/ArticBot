const ClientEmbed = require("../../structures/ClientEmbed");
const emojis = require("../../utils/emojis");
const Command = require("../../structures/Command");
module.exports = class prefix extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "help";
    this.category = "Bot";
    this.description = "Exibe o menu de ajuda do BOT";
    this.usage = "help [comando]";
    this.aliases = ["ajuda", "h"];

    this.enabled = true;
    this.guildOnly = true;
  }
  async run(message, args, prefix, author, channel) {

    if(!args[0]) {
        const Bot = []
        const Config = []
        const Information = []
        const Pedido = []
        this.client.commands.all.map((x) => {
            if(x.category == "Bot") {
                Bot.push(x.name)
            } else if(x.category == "Config") {
                Config.push(x.name)
            } else if(x.category == "Information") {
                Information.push(x.name)
            } else if(x.category == "Pedidos") {
                Pedido.push(x.name)
            }
        })
        
        const botav = this.client.user.displayAvatarURL({ dynamic: true });
        const helpembed = new ClientEmbed(author)
        .setAuthor(`${this.client.user.username} ¦ Menu de ajuda`, botav)
    .setDescription(`**Seja bem-vindo ao menu de ajuda do Bot Oficial da Artic Team ${author}, reaja com o emoji respectivo a categoria que você precisa de ajuda.** \n\n**Reaja com: \n\n${emojis.cancel} Para cancelar** \n**${emojis.return} Para retornar para essa página** \n\n**${emojis.bot} Para comandos do Bot \n${emojis.config} Para comandos de configuração (exclusivos para staff) \n${emojis.info} Para comandos de informação \n${emojis.helporder} Para comandos do sistema de pedidos** \n\nQualquer dúvida adicional entre em contato com o algum <@&822425991083196416>.`)
        const helpsend = await channel.send(author, helpembed)
        await helpsend.react(emojis.bot)
        await helpsend.react(emojis.config)
        await helpsend.react(emojis.info)
        await helpsend.react(emojis.helporder)
        await helpsend.react(emojis.cancel)
        await helpsend.react(emojis.return)
        
        const filter = (reaction, user) => {
            return user.id == author.id
        }
        const collector = helpsend.createReactionCollector(filter, {time: 120000});
        collector.on("collect", async(reaction, user) => {
            switch(reaction.emoji.name) {
                case "bot":
                    const bot = new ClientEmbed(author)
                    .setAuthor(`${this.client.user.username} ¦ Menu de ajuda`, botav)
                    .setDescription(`${emojis.bot} ¦ Comando - Descrição / Sub-comando - descrição: \n\n${!Bot.length ? "Nenhum comando" : Bot.map((x) => `\`${prefix}${x}\` - ${this.client.commands.all.get(x).description} \n**SubCommands:** \n${!this.client.commands.subcommands.get(x) ? "Nenhum subcomando" : this.client.commands.subcommands.get(x).map((x) => `\`${x.name}\` - ${x.description} \n`).join(" ")} \n`).join(" ")}`)
                    helpsend.edit(bot)
                    break
                case "settings":
                    const config = new ClientEmbed(author)
                    .setAuthor(`${this.client.user.username} ¦ Menu de ajuda`, botav)
                    .setDescription(`${emojis.config} ¦ Comando - Descrição / Sub-comando - descrição: \n\n${!Config.length ? "Nenhum comando" : Config.map((x) => `\`${prefix}${x}\` - ${this.client.commands.all.get(x).description} \n**SubCommands:** \n${!this.client.commands.subcommands.get(x) ? "Nenhum subcomando" : this.client.commands.subcommands.get(x).map((x) => `\`${x.name}\` - ${x.description} \n`).join(" ")} \n`).join(" ")}`)
                    helpsend.edit(config)
                    break
                case "informationbutton":
                    const info = new ClientEmbed(author)
                    .setAuthor(`${this.client.user.username} ¦ Menu de ajuda`, botav)
                    .setDescription(`${emojis.info} ¦ Comando - Descrição / Sub-comando - descrição: \n\n${!Information.length ? "Nenhum comando" : Information.map((x) => `\`${prefix}${x}\` - ${this.client.commands.all.get(x).description} \n**SubCommands:** \n${!this.client.commands.subcommands.get(x) ? "Nenhum subcomando" : this.client.commands.subcommands.get(x).map((x) => `\`${x.name}\` - ${x.description} \n`).join(" ")} \n`).join(" ")}`)
                    helpsend.edit(info)
                    break
                case "orderh":
                    const pedido = new ClientEmbed(author)
                    .setAuthor(`${this.client.user.username} ¦ Menu de ajuda`, botav)
                    .setDescription(`${emojis.helporder} ¦ Comando - Descrição / Sub-comando - descrição: \n\n${!Pedido.length ? "Nenhum comando" : Pedido.map((x) => `\`${prefix}${x}\` - ${this.client.commands.all.get(x).description} \n**SubCommands:** \n${!this.client.commands.subcommands.get(x) ? "Nenhum subcomando" : this.client.commands.subcommands.get(x).map((x) => `\`${x.name}\` - ${x.description} \n`).join(" ")} \n`).join(" ")}`)
                    helpsend.edit(pedido)
                    break
                case "return":
                    helpsend.edit(helpembed)
                    break;
                case "cancel":
                    helpsend.delete()
                    collector.stop()
                break
            }
        });
    } else {
        const botav = this.client.user.displayAvatarURL({ dynamic: true });
        const cmd = this.client.commands.all.get(args[0]) ||
        this.client.commands.all.get(
            this.client.aliases.get(args[0])
        )

        const cmdembed = new ClientEmbed(author)
        .setTitle(`${this.client.user.username} ¦ Menu de ajuda do comando ${cmd.name}`, botav)
        .addField(`Nome do comando:`, cmd.name)
        .addField(`Aliases:`, cmd.aliases.map((x) => `${x}`).join(", "))
        .addField(`Categoria:`, cmd.category)
        .addField(`Descrição:`, cmd.description)
        .addField(`Uso:`, cmd.usage)
        .addField(`Subcommands:`, cmd.subs.map((x) => `${x}`).join(", "))
        .addField(`Ativo?`, !cmd.enabled ? "Não" : "Sim")
        .addField(`Somente para staff?`, !cmd.staffOnly ? "Não" : "Sim")

        channel.send(cmdembed)

    }
  }
}