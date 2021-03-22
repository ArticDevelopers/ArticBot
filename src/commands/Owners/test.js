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
      const tstc = this.client.channels.cache.get('822084499567411263')
      const send = tstc.send('a').then(async(x) => channel.send(x.id))

  }
}