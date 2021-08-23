const fs = require("fs");
const {Client, Collection} = require("discord.js");
const {token, prefix, others} = require("./config.json") ;
const client = new Client();

client.commands = new Collection();
for (const file of fs.readdirSync(`./commands`)) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

process.on("unhandledRejection", e => console.error(e));

client.on("error", e => console.error(`Another error: ${e}`));
client.on("warn", e => console.warn(`Warning: ${e}`));

client.on("ready", _ => console.log("Connected to WebSocket!"));
client.on("disconnect", _ => console.log("Looks like connection to WebSocket was lost, I will reconnect immediately when coonection appears."));
client.on("reconnecting", _ => console.log("Im reconnecting to WebSocket now..."));
client.on("resume", _ => console.log("Reconnected to WebSocket!"));

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async message => {
    if (message.author != client.user && !others.includes(message.author.id)) return;
    if (!message.content.startsWith(prefix)) return;
    if (message.content.length > (1800+prefix.length)) return console.warn("Too much!");

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandString = args.shift().toLowerCase().replace(/\ /g,"");
    if (commandString.length == 0) return;
    const command = client.commands.get(commandString) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandString)) || client.commands.find(cmd => cmd.name.startsWith(commandString));
    if (!command) return console.warn("Command not found!");

    try {
        console.log(`Executing ${command.name}!`);
        await command.execute(message, args);
    } catch(e) {console.error(e)};
});

client.login(token);