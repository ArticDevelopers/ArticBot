const emojis = require("../../utils/emojis");
const Command = require("../../structures/Command");
const ClientEmbed = require('../../structures/ClientEmbed')
module.exports = class prefix extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "devs";
    this.category = "Information";
    this.description = "Lista de developers"
    this.usage = "devs";
    this.aliases = ["dev", "dvs", "developers"];

    this.enabled = true;
    this.guildOnly = true;
    this.ownerOnly = false
  }
  async run(message, args, prefix, author, channel) {
    const client = await this.client.database.client.findOne({_id: this.client.user.id})
    if(!args[0]) {
      const list = new ClientEmbed(author)
      .setAuthor(`Lista de developers da Artic Team`, this.client.user.displayAvatarURL({dynamic: true}))
      .addField(`Lista de desenvolvedores: (${!client.devs.length ? "0" : client.devs.length})`, !client.devs.length ? "Nenhum desenvolvedor" : client.devs.map((x) => `\`${x}\``).join(", "))
      .setThumbnail(message.guild.iconURL({dynamic: true}))
      return channel.send(list)
    }
    
    
    if(["set", "setar"].includes(args[0].toLowerCase())) {
    // Pega um usuário //  
    const user = 
      this.client.users.cache.get(args[1]) ||
      message.mentions.users.first() ||
      author
      
      const username = user.username
      // Puxa a doc da db de user //
      const doc = await this.client.database.user.findOne({_id: user.id})
      // Puxa a doc da db do bot //
  
       // Cargo de dev //
       const dev = message.guild.roles.cache.find((x) => x.name == 'Developer Oficial')

       // Guild User //
      const userguild = message.guild.members.cache.get(user.id)

      // Comando //
      if(doc.developer) {
          channel.send(`${emojis.ok} ¦ ${author}, o usuário **${user.username}** não é mais um developer.`)
          await doc.updateOne({$set:{developer: false}})
          await this.client.database.client.findOneAndUpdate({_id: this.client.user.id}, {$pull:{devs: username}})
          userguild.roles.remove(dev)
      } else {
          channel.send(`${emojis.ok} ¦ ${author}, o usuário **${user.username}** agora é um developer.`)
          await doc.updateOne({$set:{developer: true}})
          await this.client.database.client.findOneAndUpdate({_id: this.client.user.id}, {$push:{devs: username}})
          userguild.roles.add(dev)
      }
    }
  }
}