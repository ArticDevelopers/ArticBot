module.exports = class Command {
    constructor(client) {
        this.client = client;

        this.name = "Nome"
        this.category = "Categoria"
        this.description = "Descrição"
        this.usage = "Sem Informação"
        this.aliases = []
        this.reference = "Cmd Referente"
    
        this.enabled = true
        this.guildOnly = true
        this.ownerOnly = false
        this.sub = false
    }
    async run() {}
}