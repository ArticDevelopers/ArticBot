const emojis = require("../../utils/emojis");
const Command = require("../../structures/Command");
module.exports = class prefix extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "eval";
    this.category = "owner";
    this.description = "Comando para configurar o prefix do bot";
    this.usage = "eval";
    this.aliases = ["ev"];

    this.enabled = true;
    this.guildOnly = true;
    this.ownerOnly = true
  }
  async run(message, args, prefix, author, channel) {
    try {
    const BLOCK = ["token", "process"];
    if (BLOCK.some((x) => x === args[0])) return;

    if (!args[0]) return;

    const cod = args.join(" ");
    let result = eval(cod);
    if (typeof result !== "string")
      result = require("util").inspect(result, { depth: 0 });
    message.channel.send(
      `Entrada: \`\`\`js\n${cod}\`\`\`\n Saída: \`\`\`js\n${result}\`\`\``
    )
} catch (error) {
  channel.send(`Erro: ${error}`)
}
  }
};
