const emojis = require("../../utils/emojis");
const Command = require("../../structures/Command");
module.exports = class prefix extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "setstaff";
    this.category = "owner";
    this.description = "Comando para setar staffs";
    this.usage = "setstaff <user> <cargo>";
    this.aliases = ["ss"];

    this.enabled = true;
    this.guildOnly = true;
    this.ownerOnly = true
  }
  async run(message, args, prefix, author, channel) {
    const doc = await this.client.database.client.findOne({_id: this.client.user.id})
    const clientdb = this.client.database.client
    const cid = this.client.user.id
    if(!args[0] || !args[1]) return channel.send(`${emojis.errado} ¦ ${author}, você precisa mencionar quem você deseja adicionar na lista de Staff. (Cargos: **CEO, GERENTE, ADMIN, MOD, SUP**)`)
    
    const user = 
    this.client.users.cache.get(args[0]) ||
    message.guild.members.cache.find((x) => x.name == args[0]) ||
    message.mentions.users.first()
    
    if(!user) return channel.send(`${emojis.errado} ¦ ${author}, você precisa mencionar quem você deseja adicionar na lista de Staff.`)
    const guilduser = message.guild.members.cache.get(user.id)
    const doc2 = await this.client.database.user.findOne({_id: user.id})
    let role = args[1].toLowerCase()
    if(role == "ceo") {
    const ceo = await message.guild.roles.cache.find((x) => x.name == "CEO")
    if(doc.staff.owner.find((x) => x == user.tag)) {
        channel.send(`${emojis.ok} ¦ ${author}, o usuário **${user.tag}** não está mais setado como **CEO**`)
        guilduser.roles.remove(ceo)
        await clientdb.findOneAndUpdate({_id: this.client.user.id}, {$pull:{'staff.owner': user.tag}})
        await doc2.updateOne({$set:{owner: false}})
    } else {
        channel.send(`${emojis.ok} ¦ ${author}, o usuário **${user.tag}** foi setado como meu **CEO**`)
        guilduser.roles.add(ceo)
        await clientdb.findOneAndUpdate({_id: cid}, {$push:{'staff.owner': user.tag}})
        await doc2.updateOne({$set:{owner: true}})
    }   
} else if(role == "gerente") {
    const ger = await message.guild.roles.cache.find((x) => x.name == "Gerente")
    if(doc.staff.gerente.find((x) => x == user.tag)) {
        channel.send(`${emojis.ok} ¦ ${author}, o usuário **${user.tag}** não está mais setado como **Gerente**`)
        guilduser.roles.remove(ger)
        await clientdb.findOneAndUpdate({_id: this.client.user.id}, {$pull:{'staff.gerente': user.tag}})
    } else {
        channel.send(`${emojis.ok} ¦ ${author}, o usuário **${user.tag}** foi setado como meu **Gerente**`)
        guilduser.roles.add(ger)
        await clientdb.findOneAndUpdate({_id: cid}, {$push:{'staff.gerente': user.tag}})

    } 
} else if(role == "admin") {
  const rol = await message.guild.roles.cache.find((x) => x.name == "Administrador")
  if(doc.staff.admin.find((x) => x == user.tag)) {
      channel.send(`${emojis.ok} ¦ ${author}, o usuário **${user.tag}** não está mais setado como **Administrador**`)
      guilduser.roles.remove(rol)
      await clientdb.findOneAndUpdate({_id: this.client.user.id}, {$pull:{'staff.admin': user.tag}})
  } else {
      channel.send(`${emojis.ok} ¦ ${author}, o usuário **${user.tag}** foi setado como meu **Administrador**`)
      guilduser.roles.add(rol)
      await clientdb.findOneAndUpdate({_id: cid}, {$push:{'staff.admin': user.tag}})
}
} else if(role == "moderador") {
  const rol = await message.guild.roles.cache.find((x) => x.name == "Moderador")
  if(doc.staff.moderador.find((x) => x == user.tag)) {
      channel.send(`${emojis.ok} ¦ ${author}, o usuário **${user.tag}** não está mais setado como **Moderador**`)
      guilduser.roles.remove(rol)
      await clientdb.findOneAndUpdate({_id: this.client.user.id}, {$pull:{'staff.moderador': user.tag}})
  } else {
      channel.send(`${emojis.ok} ¦ ${author}, o usuário **${user.tag}** foi setado como meu **Moderador**`)
      guilduser.roles.add(rol)
      await clientdb.findOneAndUpdate({_id: cid}, {$push:{'staff.moderador': user.tag}})
  }
} else if(role == "sup") {
  const rol = await message.guild.roles.cache.find((x) => x.name == "Suporte")
  if(doc.staff.suporte.find((x) => x == user.tag)) {
      channel.send(`${emojis.ok} ¦ ${author}, o usuário **${user.tag}** não está mais setado como **Suporte**`)
      guilduser.roles.remove(rol)
      await clientdb.findOneAndUpdate({_id: this.client.user.id}, {$pull:{'staff.suporte': user.tag}})
  } else {
      channel.send(`${emojis.ok} ¦ ${author}, o usuário **${user.tag}** foi setado como meu **Suporte**`)
      guilduser.roles.add(rol)
      await clientdb.findOneAndUpdate({_id: cid}, {$push:{'staff.suporte': user.tag}})
  }
} else {
  return channel.send(`${emojis.errado} ¦ ${author}, você precisa inserir um cargo válido. Lista de cargos: **CEO, GERENTE, ADMIN, MOD, SUP**`)
}
  }
}