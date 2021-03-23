const emojis = require("../../utils/emojis");
const Command = require("../../structures/Command");
module.exports = class prefix extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "test";
    this.category = "owner";
    this.description = "Comando para configurar o prefix do bot";
    this.usage = "eval";
    this.aliases = [];

    this.enabled = true;
    this.guildOnly = true;
    this.ownerOnly = true
  }
  async run(message, args, prefix, author, channel) {
    const doc = await this.client.database.client.findOne({_id: this.client.user.id})
    
    const guild = message.guild
    const category = guild.channels.cache.find((x) => x.id == "823645873187717131" && x.type == "category")
    guild.channels.create(`test`, {
      permissionOverwrites: [
        {
          id: guild.id,
          deny: [
            "CONNECT",
            "VIEW_CHANNEL"
          ]
        }
      ],
      parent: category.id,
      type: "VOICE"
    }).then((x) => console.log(x.id))
    channel.send(category.name)
    //const tstc = this.client.channels.cache.get('822084499567411263')
      //const send = tstc.send('a').then(async(x) => channel.send(x.id))

  }
}