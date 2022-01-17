const { RichEmbed } = require("discord.js");
const Messages = require("../core/Messages");

module.exports = {
	name: "color",
	args: true,
	aliases: ["hex"],
	execute(message, args) {
		const string = args[0].slice(1);
		const color = parseInt(args[0]) || (string.length === 6 ? parseInt(string, 16) : parseInt(string.split("").map(v => v+v).join(""), 16));
		if (!color || color>16777215) return Messages.warning(message, "That is not a color!", {timeout: 1000});
		message.edit(new RichEmbed({
			color: color,
			title: args[0]
		})).catch();
	}
}