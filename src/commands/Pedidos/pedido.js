const emojis = require("../../utils/emojis");
const Command = require("../../structures/Command");
const ClientEmbed = require("../../structures/ClientEmbed");
module.exports = class prefix extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "pedido";
    this.category = "Pedidos";
    this.description = "Realiza um pedido de orçamento para nossos Devs";
    this.usage = "pedido";
    this.aliases = ["orcamento", "orçamento", "order"];
    this.subs = ["add", "resposta"]
    this.reference = "pedido";
    this.enabled = true;
    this.guildOnly = true;
    this.ownerOnly = false;
  }
  async run(message, args, prefix, author, channel) {
    const subs =
      args[0] &&
      this.client.commands.subcommands
        .get(this.reference)
        .find(
          (cmd) =>
            cmd.name.toLowerCase() === args[0].toLowerCase() ||
            cmd.aliases.includes(args[0].toLowerCase())
        );
    let user;
    let sub;
    let subcmd;

    if (!subs) {
      sub = "null";
      subcmd =
        sub &&
        this.client.commands.subcommands
          .get(this.reference)
          .find(
            (cmd) =>
              cmd.name.toLowerCase() === sub.toLowerCase() ||
              cmd.aliases.includes(sub.toLowerCase())
          );
    } else {
      subcmd = subs;
    }

    subcmd.run(message, args, prefix, author, channel);
  }
};
