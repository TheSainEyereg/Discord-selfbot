const { RichEmbed } = require("discord.js");
const Messages = require("../core/Messages");

module.exports = {
	name: "color",
	args: true,
	aliases: ["hex"],
	execute(message, args) {
		const color = parseInt(args[0]) ? args[0] : args[0].replace("#", "").length == 6 ? parseInt(args[0].replace("#", ""), 16) : parseInt(args[0].replace("#", ""), 16)**2+parseInt(args[0].replace("#", ""), 16)*2;
		if (!color || color>16777215) return Messages.warning(message, "That is not a color!", {timeout: 1000});
		message.edit(new RichEmbed({
			color: color,
			title: args[0]
		})).catch();
	}
}