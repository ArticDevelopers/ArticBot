const ClientEmbed = require("../../../structures/ClientEmbed");
const Command = require("../../../structures/Command");
const emojis = require("../../../utils/emojis");
const moment = require("moment");
const { MessageEmbed } = require("discord.js");
module.exports = class add extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "author";
    this.category = "Staff";
    this.description = "Cria uma embed com author";
    this.usage = "embed author e responda as perguntas";
    this.aliases = ["autor"];
    this.reference = "embed";

    this.enabled = true;
    this.guildOnly = true;
    this.sub = true;
  }
  async run(message, args, prefix, author, channel) {
      let atext;
      let imgtype;
      let content;
      let footer;
      let thumb
      let color;
      const c1 = channel.createMessageCollector((x) => x.author.id == author.id, {time: 60000})
      channel.send(`${author}, iniciando a criação da embed, caso queira cancelar não digite nada no chat dentro de 1 minuto.`)
      channel.send(`> ${author}, insira abaixo o que deve aparecer no texto do author da embed (emojis não são suportados). Formato: <texto> **Você tem 1 minuto para isso**`)
      c1.on('collect', async (c) => {
        atext = `${c.content}`     
        c1.stop()
        await channel.send(`> ${author}, agora insira o tipo de imagem que você deseja utilizar com foto do author no topo da embed. **{guildicon} = imagem da guild** / **{authoravatar}** = avatar do autor da mensagem / **{botavatar} = avatar do bot** Tempo: 15 segundos `)
        const c2 = channel.createMessageCollector((x) => x.author.id == author.id, {time: 15000})
        c2.on('collect', async (c) => {
            const replaced = c.content
            .replace(/{guildicon}/g, message.guild.iconURL({dynamic: true}))
            .replace(/{authoravatar}/g, author.displayAvatarURL({dynamic: true}))
            .replace(/{botavatar}/g, this.client.user.displayAvatarURL({dynamic: true}))
            imgtype = replaced
            c2.stop()
        await channel.send(`> ${author}, agora insira o conteúdo da embed. Tempo: 1 minuto`)
        const c3 = channel.createMessageCollector((x) => x.author.id == author.id, {time: 60000})
        c3.on('collect', async (c) => {
            content = `${c.content}`
            c3.stop()
        await channel.send(`> ${author}, agora insira a thumbnail da imagem (carregado no imgur). Caso não queira nada escreva **null**. Tempo: 1 minuto`)
        const c4 = channel.createMessageCollector((x) => x.author.id == author.id, {time: 60000})
        c4.on('collect', async (c) => {
            if(c.content !== "null") thumb = `${c.content}`, c4.stop()
            c4.stop()
        await channel.send(`> ${author}, insira uma cor no formato hex (Exemplo: #FFFFFF). Tempo: 30 segundos`)
        const c5 = channel.createMessageCollector((x) => x.author.id == author.id, {time: 30000})
            c5.on('collect', async (c) => {
                color = c.content
                c5.stop()
        await channel.send(`> ${author}, para finalizar insira o footer (texto que fica na parte debaixo da embed). Tempo: 1 minuto`)
        const c6 = channel.createMessageCollector((x) => x.author.id == author.id, {time: 60000})
        c6.on('collect', async (c) => {
            footer = `${c.content}`
            c6.stop()
            let embed = new MessageEmbed()
            .setAuthor(atext, imgtype)
            .setDescription(content)
            .setColor(color)
            .setFooter(footer, imgtype)
            if(thumb) {
                embed.setThumbnail(thumb)
            }
            channel.send(embed)
        })
            })
        })
        })
        })
    })
  }
}