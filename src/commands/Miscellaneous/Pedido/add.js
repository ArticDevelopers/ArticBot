const ClientEmbed = require('../../../structures/ClientEmbed')
const Command = require("../../../structures/Command");
const emojis = require("../../../utils/emojis");
const moment = require('moment')
module.exports = class add extends Command {
    constructor(client) {
      super(client);
      this.client = client;
  
      this.name = "add";
      this.category = "Miscellaneous";
      this.description = "Realiza uma solicitação de orçamento";
      this.usage = "pedido add";
      this.aliases = ["adicionar", "fazer", "realizar", "make", "null"];
      this.reference = "pedido"
  
      this.enabled = true;
      this.guildOnly = true;
      this.sub = true
    }
    async run(message, args, prefix, author, channel) {
        moment.locale("pt-br")
        // Puxar Database //
        const userdb = await this.client.database.user.findOne({_id: author.id})
        const clientdb = await this.client.database.client.findOne({_id: this.client.user.id})

        // Verifica se o usuário já atingiu o número máximo de pedidos (2) //
        if(userdb.pedidos.ids.length > 2) return this.client.channels.cache.get('823329599693520926').send(`${emojis.errado} ¦ ${author}, ocorreu uma falha ao criar a solicitação: você já atingiu o número máximo de orçamentos/pedidos abertos. Aguarde eles serem fechados.`)

        // Pega o ID do pedido //
        let pid = clientdb.lastorc
        pid = pid + 1

        // Database de pedidos //
        const pedidodb = await this.client.database.pedido.findOne({_id: `orc${pid}`})

        // Verifica se já possui um pedido com esse ID //
        if(!pedidodb) {
        // Código //
            message.delete()
            try {
               await author.send(`Responda as perguntas abaixo para criar uma solicitação de orçamento. `)
            }catch(err) {
               if(err) return this.client.channels.cache.get('823329599693520926').send(`${emojis.errado} ¦ ${author}, ocorreu uma falha ao criar a solicitação: sua DM está bloqueada, desbloqueie e tente novamente.`)
            }
            let complexo;
            let coisas;
            let valor;
            let users;
            let status;
            let host;
            let tempo;

            author.createDM()
            await author.send(`> Qual a complexidade do Bot de 0 - 10? (0 não muito complexo e 10 muito complexo) **Você tem 15 segundos para responder**`)
            var ccollector = author.dmChannel.createMessageCollector((x) => x.author.id == author.id, {time: 15000})
            ccollector.on('collect', async (c) => {
              if(isNaN(c.content)) return channel.send(`${emojis.errado} ¦ ${author}, você precisa inserir um número de 0-10`)
                complexo = c.content
                ccollector.stop()
                await author.send(`> O que você quer no Bot? **Você tem 5 minutos para responder.**`)
                var coisasc = author.dmChannel.createMessageCollector((x) => x.author.id == author.id, {time: 300000})
                coisasc.on('collect', async (c) => {
                    //if(c.content.length < 250) return author.send(`Você precisa inserir no minimo 250 caracteres.`) 
                    coisas = c.content
                    coisasc.stop()
                    await author.send(`> Qual é o valor máximo que você está disposto a pagar? **Você tem 30 segundos para responder**`)
                    var valorc = author.dmChannel.createMessageCollector((x) => x.author.id == author.id, {time: 30000})
                    valorc.on('collect', async (c) => {
                        valor = c.content
                        valorc.stop()
                    await author.send(`> Em média quantos usuários vão usar o Bot? **Você tem 30 segundos para responder**`)
                    var usersc = author.dmChannel.createMessageCollector((x) => x.author.id == author.id, {time: 30000})
                    usersc.on('collect', async (c) => {
                       users = c.content
                        usersc.stop()
                   
                   await author.send(`> O Bot será público ou privado? (Só a sua guild ou outras) **Você tem 30 segundos para responder**`)
                   var statusc = author.dmChannel.createMessageCollector((x) => x.author.id == author.id, {time: 30000})
                  statusc.on('collect', async (c) => {
                     status = c.content
                       statusc.stop()
                       await author.send(`> Você usará host paga ou gratuita? **Você tem 30 segundos para responder**`)
                       var hostc = author.dmChannel.createMessageCollector((x) => x.author.id == author.id, {time: 30000})
                      hostc.on('collect', async (c) => {
                        host = c.content
                           hostc.stop()
                      
                      await author.send(`> Quanto tempo você pode esperar para o Bot ficar pronto? **Você tem 30 segundos para responder**`)
                      var tempoc = author.dmChannel.createMessageCollector((x) => x.author.id == author.id, {time: 30000})
                    tempoc.on('collect', async (c) => {
                       tempo = c.content
                          tempoc.stop()

                        await author.send(`${emojis.ok} ¦ Sua solicitação foi registrada, agora aguarde até que algum orçamentista entre em contato com você.`)
                        const logc = this.client.channels.cache.get('823329561537150988')
                        const orcc = this.client.channels.cache.get('822434129966268488')
                        
                        await this.client.database.pedido.create({_id: `orc${pid}`, 'info.idu': author.id, 'info.nu': author.tag, 'info.date': Date.now(), 'info.orcamento.ativo': true, 'id': pid})

                        const loge = new ClientEmbed(author)
                        .setTitle(`${emojis.order} Novo orçamento:`)
                        .addField(`Autor:`, author.tag)
                        .addField(`ID:`, pid)
                        .addField(`Data:`, moment(Date.now()).format('LLL'))
                        .setDescription(`**Status:**: \nEm análise`)
                        .setThumbnail(author.displayAvatarURL({dynamic: true}))
                        const logsend = logc.send(`<@&823338158241480716>`, loge).then(async(x) => await this.client.database.pedido.findOneAndUpdate({_id: `orc${pid}`}, {$set:{'info.messageid2': x.id}}))

                        const orce = new ClientEmbed(author)
                        .setTitle(`${emojis.new} Novo orçamento:`)
                        .addField(`Autor:`, author.tag)
                        .addField(`ID:`, pid)
                        .addField(`Data:`, moment(Date.now()).format('LLL'))
                        .addField(`Complexidade:`, complexo)
                        .addField(`O que precisa ter:`, coisas)
                        .addField(`Valor máximo:`, valor)
                        .addField(`Quantidade usuários:`, users)
                        .addField(`Privacidade:`, status)
                        .addField(`Host:`, host)
                        .addField(`Tempo limite:`, tempo)
                        .setThumbnail(author.displayAvatarURL({dynamic: true}))

                       const orcsend = orcc.send(`Nova solicitação de orçamento: \n||<@&823338158241480716>||`, orce).then(async(x) => await this.client.database.pedido.findOneAndUpdate({_id: `orc${pid}`}, {$set:{'info.messageid': x.id}}))

                       const guild = message.guild
                       const category = guild.channels.cache.find((x) => x.id == "823655729738809344" && x.type == "category")
                       guild.channels.create(`orçamento ${pid}`, {
                        parent: category.id,
                         permissionOverwrites: [
                          {
                            id: author.id,
                            allow: [
                            "VIEW_CHANNEL",
                             "READ_MESSAGE_HISTORY",
                             "SEND_MESSAGES"
                            ]
                          },
                          {
                            id: "822427773112942592",
                            allow: [
                              "VIEW_CHANNEL",
                              "SEND_MESSAGES",
                              "READ_MESSAGE_HISTORY"
                            ]
                          },
                           {
                             id: guild.id,
                             deny: "VIEW_CHANNEL"
                           },
                         ],
                        
                       }).then(async(x) => await this.client.database.pedido.findOneAndUpdate({_id: `orc${pid}`}, {$set:{channelid: x.id}}))
                        await this.client.database.client.findOneAndUpdate({_id: this.client.user.id}, {$set:{lastorc: pid}})
                        await this.client.database.user.findOneAndUpdate({_id: author.id}, {$push:{'pedidos.ids': `orc${pid}`}}, {$set:{'pedidos.aberto': true}})
                        
                     })
                  })
                    })
                })
            })
        })
    })
        }
    }
}