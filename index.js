const fs = require("fs");
const {Client, Collection} = require("discord.js");
const {token, prefix, others} = require("./config.json") ;
const client = new Client({ ws:{properties: {$browser: process.argv[2] == "mobile" ? "Discord iOS" : "Desktop"}}});

const Messages = global.Messages = require("./core/Messages.js");

client.commands = new Collection();
for (const file of fs.readdirSync(`./commands`)) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.integrations = new Collection();
for (const file of fs.readdirSync(`./integrations`)) {
    const integration = require(`./integrations/${file}`);
    client.integrations.set(file.split(".")[0], integration);
}

process.on("unhandledRejection", e => console.error(e));

client.on("error", e => console.error(`Another error: ${e}`));
client.on("warn", e => console.warn(`Warning: ${e}`));

client.on("ready", _ => console.log("Connected to WebSocket!"));
client.on("disconnect", _ => console.log("Looks like connection to WebSocket was lost, I will reconnect immediately when coonection appears."));
client.on("reconnecting", _ => console.log("Im reconnecting to WebSocket now..."));
client.on("resume", _ => console.log("Reconnected to WebSocket!"));

client.once("ready", _ => {
  console.log(`Logged in as ${client.user.tag}!`);
  //client.user.setActivity("JS Development", {type: "STREAMING",url: "https://www.twitch.tv/pornhub"});
});

client.on("message", async message => {
    if (message.author != client.user && !others.includes(message.author.id)) return;
    if (!message.content.startsWith(prefix)) {
        if (message.attachments.size != 0) return;
        const integration = client.integrations.find(int => message.content.match(int.regexp));
        if (!integration) return;
        return integration.execute(message);
    };
    if (message.content.length > (1800+prefix.length)) return Messages.error(message, "Too much!", {timeout: 1000})

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandString = args.shift().toLowerCase().replace(/\ /g,"");
    if (commandString.length == 0) return;
    const command = client.commands.find(cmd => cmd.name.startsWith(commandString)) || client.commands.find(cmd => cmd.aliases && cmd.aliases.find(a => a.startsWith(commandString)));
    if (!command) return Messages.error(message, "Command not found!", {timeout: 1000});
    
    if(args.length == 0 && command.args) return Messages.warning(message, "Arguments required!", {timeout: 1000})

    try {
        //console.log(`Executing ${command.name}!`);
        await command.execute(message, args);
    } catch(e) {
        console.error(e);
        return Messages.error(message, "Error in command!", {description:`\`\`\`${e}\`\`\``, timeout: 1000});
    }
});

client.login(token);