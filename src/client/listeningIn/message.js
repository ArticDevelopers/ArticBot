const GetMention = (id) => new RegExp(`^<@!?${id}>( |)$`);
const discord = require("discord.js");
const emojis = require("../../utils/emojis");
const moment = require("moment");
const owners = ["342757511218200588", "600804786492932101"]
require("dotenv").config();

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(message) {
    moment.locale("pt-br");

    try {
      const author = message.author;
      const channel = message.channel;
      const guild = message.guild;

      // Verifica se o autor da mensagem é um bot //
      if (author.bot == true) return;

      // Databases //
      const user = await this.client.database.user.findOne({
        _id: message.author.id,
      });
      const server = await this.client.database.guild.findOne({
        _id: guild.id,
      });
      const bot = await this.client.database.client.findOne({
        _id: this.client.user.id,
      });

      // Verifica se tem os documentos //
      if (user) {
        if (server) {
          if (bot) {
            if (server.cmdblock.status) {
              if (server.cmdblock.channels.find((x) => x == channel.id))
                return channel.send(
                  `${emojis.errado} | ${author}, você não pode me usar aqui. Me use no <#822446731497177118>`
                );
            }
            const prefix = server.prefix;
            if (message.content.match(GetMention(this.client.user.id))) {
                const mentionembed = new discord.MessageEmbed()
                  .setDescription(
                    `**Olá ${author.username}, eu sou o Bot oficial da Artic Team, fui desenvolvido pelo **[Rick](https://github.com/Rickozin)** e pelo **[zSpl1nterUS_](https://github.com/zSpl1nterUS)** com a função de gerenciar esse servidor e ajuda-los da melhor forma possível.** \nMeu prefixo é **${server.prefix}** \nCaso queira saber meus comandos use **${server.prefix}help** \n\n**Links da Artic Team:** \n**${emojis.github} [Github da Artic](https://github.com/ArticDevelopers)**\n**${emojis.github} [Github do Rick](https://github.com/Rickozin)**\n**${emojis.github} [Github do zSpl1nterUS](https://github.com/zSpl1nterUS)**\n**${emojis.instagram} [Instagram da Artic](https://instagram.com/articdevs/)**\n**${emojis.twitter} [Twitter da Artic](https://twitter.com/articdevs/)**\n**${emojis.discord} [Discord da Artic](https://discord.gg/ctwp53HUU6)**`
                  )
                  .setColor(process.env.EMBED_COLOR)
                  .setFooter(
                    `Todos os direitos reservados: Equipe ₢Artic Developers 2021`
                  )
                  .setThumbnail(
                    this.client.user.displayAvatarURL({ dynamic: true })
                  );
                channel.send(author, mentionembed);
              } 
            if(message.content.indexOf(prefix) !== 0) return;
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
            const cmd =
              this.client.commands.get(command) ||
              this.client.commands.get(this.client.aliases.get(command));
        
            if(cmd.ownerOnly) {
              if(!owners.some((x) => x === author.id)) return;
            }
            const cmdname = cmd.name;

            const doc = await this.client.database.command.findOne({
              _id: cmdname,
            });
            if (doc) {
              cmd.run(message, args, prefix, author, channel);
              var num = doc.usos;
              num = num + 1;
              var cnun = bot.cmdusos;
              cnun = cnun + 1;
              await doc.updateOne({ usos: num });
              await bot.updateOne({ cmdusos: cnun });

              const logcmd = new discord.MessageEmbed()
                .setAuthor(
                  `Artic Official cmdlog:`,
                  this.client.user.displayAvatarURL({ dynamic: true })
                )
                .addFields(
                  {
                    name: `Comando:`,
                    value: `${prefix}${cmdname} ${args.join(" ")}`,
                  },
                  {
                    name: `Utilizador:`,
                    value: `${message.author.tag} (${message.author.id})`,
                  },
                  {
                    name: "Data:",
                    value: `${moment(Date.now() - 1.08e7).format("LLL")}`,
                  },
                  {
                    name: `Canal:`,
                    value: `#${channel.name} (${channel.id})`,
                  }
                )
                .setTimestamp()
                .setFooter(
                  `${message.author.tag} || ${message.author.id}`,
                  message.author.displayAvatarURL({ dynamic: true })
                )
                .setColor(process.env.EMBED_COLOR);
              if (user.admin) return;
              await this.client.channels.cache
                .get(process.env.cmdlog)
                .send(logcmd);
            } else
              this.client.database.command.create({
                _id: cmdname,
                usos: 1,
                cmdmanu: false,
              });
          } else
            this.client.database.client.create({ _id: this.client.user.id });
        } else
          this.client.database.guild.create({
            _id: guild.id,
            name: guild.name,
          });
      } else
        this.client.database.user.create({ _id: author.id, name: author.tag });
    } catch (err) {
      if (err) return console.log(`Erro no evento message.js:`, err);
    }
  }
};
