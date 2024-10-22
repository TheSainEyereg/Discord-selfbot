const fs = require("fs");
const {Client, Collection} = require("discord.js-selfbot-v13");
const {token, prefix, DISABLE_EMBED_HIDE} = require("./config.json") ;
const client = new Client({
	checkUpdate: false,
	ws: {
		properties: {
			os: "Android",
			browser: "Discord Android",
			device: "alioth"
		}
	}
});

const Messages = global.Messages = require("./core/Messages.js");
const MessageEmbed = global.MessageEmbed = require("./modules/MessageEmbed.js");
global.DISABLE_EMBED_HIDE = DISABLE_EMBED_HIDE;

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

client.interactions = new Collection();
client.userInteractions = new Collection();
for (const file of fs.readdirSync(`./interactions`)) {
	const interaction = require(`./interactions/${file}`);
	client.interactions.set(interaction.name, interaction);
}

process.on("unhandledRejection", e => console.error(e));

client.on("error", e => console.error(`Another error: ${e}`));
client.on("warn", e => console.warn(`Warning: ${e}`));

client.on("shardReady", _ => console.log("Connected to WebSocket!"));
client.on("shardDisconnect", _ => console.log("Looks like connection to WebSocket was lost, I will reconnect immediately when coonection appears."));
client.on("shardReconnecting", _ => console.log("Im reconnecting to WebSocket now..."));
client.on("shardResume", _ => console.log("Reconnected to WebSocket!"));
client.on("shardError", e => console.log("WebSocket error:", e));

client.once("ready", _ => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({status: "invisible"});
  //client.user.setActivity("JS Development", {type: "STREAMING",url: "https://www.twitch.tv/pornhub"});
});

client.on("messageCreate", async message => {
	if (client.userInteractions.has(message.author.id)) {
		const interactions = client.userInteractions.get(message.author.id);
		interactions.forEach(async i => {
			const interaction = client.interactions.get(i);
			if (interaction.type !== "message") return; 
			try {
				await interaction.execute(message);
			} catch (e) {
				console.error(e);
			}
		})
	}
	if (message.author != client.user) return;

	if (!message.content.startsWith(prefix)) {
		if (message.attachments.size != 0) return;
		const integration = client.integrations.find(int => message.content.match(int.regexp));
		if (!integration) return;
		return integration.execute(message);
	};

	if (message.content.length > (1800+prefix.length)) return Messages.error(message, "Too much!", {timeout: 2500})

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandString = args.shift().toLowerCase().replace(/\ /g,"");
	if (commandString.length == 0) return;
	const command = client.commands.find(cmd => cmd.name.startsWith(commandString)) || client.commands.find(cmd => cmd.aliases && cmd.aliases.find(a => a.startsWith(commandString)));
	if (!command) return Messages.error(message, "Command not found!", {timeout: 2500});
	
	if(args.length == 0 && command.args) return Messages.warning(message, "Arguments required!", {timeout: 2500})

	try {
		await command.execute(message, args);
	} catch(e) {
		console.error(e);
		return Messages.error(message, "Error in command!", {description: e, timeout: 2500});
	}
});

client.login(token);