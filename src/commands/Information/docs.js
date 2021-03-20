const Doc = require("discord.js-docs");
const Axios = require("axios");
const discord = require("discord.js");
const emojis = require("../../utils/emojis");
const Command = require("../../structures/Command");
require("dotenv").config();
module.exports = class prefix extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "docs";
    this.category = "Information";
    this.description = "Pesquisa algo no discordjs docs";
    this.usage = "docs <pesquisa>";
    this.aliases = ["documents", "documentos"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run(message, args, prefix) {
    const find = args.join(" ");
    if (!find)
      return message.channel.send(
        `${emojis.erradogif}| ${message.author}, insira o que você deseja pesquisar antes`
      );
    const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
      find
    )}`;
    Axios.get(url)
      .then((embed) => {
        const { data } = embed;
        if (data && !data.error) {
          message.channel.send({ embed: data });
        } else {
          message.channel.send(
            `${emojis.erradogif}| ${message.author}, esse documento não existe.`
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
};