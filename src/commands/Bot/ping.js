const Command = require("../../structures/Command");
module.exports = class prefix extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "ping";
    this.category = "Bot";
    this.description = "Exibe o ping do bot";
    this.usage = "ping";
    this.aliases = [];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run(message, args, prefix) {
    message.channel.send(
      `A latência desse BOT é: **${this.client.ws.ping}ms**`
    );
  }
};
