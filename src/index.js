// Requires
const { Client, Collection} = require('discord.js');
const klaw = require('klaw');
const path = require('path');
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);

// Constructor

class ArticOfficial extends Client {
    constructor(options) {
        super(options)
        this.commands = {
            all: new Collection(),
            subcommands: new Collection()
        }
        this.aliases = new Collection()
        this.categories = new Collection()
        this.database = new Collection()
    }
    login(token) {
        token = process.env.TOKEN;
        return super.login(token)
    }
    load(commandPath, commandName) {
        const props = new (require(`${commandPath}/${commandName}`))(this);
        if(props.sub) {
            if(!this.commands.subcommands.get(props.reference)) {
                this.commands.subcommands.set(props.reference, new Collection());
            }
            this.commands.subcommands.get(props.reference).set(props.name, props)
        }
        if(props.sub) return;
        props.location = commandPath;
        if(props.init) {
            props.init(this);
        }
        this.commands.all.set(props.name, props)
        props.aliases.forEach((aliases) => {
            this.aliases.set(aliases, props.name)
        })
        return false;
    }
}
// MongoDB
const dbIndex = require("./database/index.js")
dbIndex.start()

// Klaw

const client = new ArticOfficial();
const onLoad = async () => {
    klaw("src/commands").on("data", (item) => {
        const cmdFile = path.parse(item.path);
        if(!cmdFile.ext || cmdFile.ext !== ".js") return;
        const response = client.load(cmdFile.dir, `${cmdFile.name}${cmdFile.ext}`);
        if(response) return;
    })

    const eventsFiles = await readdir(`./src/client/listeningIn/`)
    eventsFiles.forEach((file) => {
        const eventName = file.split(".")[0];
        const event =  new (require(`./client/listeningIn/${file}`))(client);
        client.on(eventName, (...args) => event.run(...args))
        delete require.cache[require.resolve( `./client/listeningIn/${file}`)]
    })

    client.login()
}

onLoad()