const MessageEmbed = require("../core/MessageEmbed");
const Messages = require("../core/Messages");

module.exports = {
	name: "color",
	args: true,
	aliases: ["hex"],
	execute(message, args) {
		if (parseInt(args[0])>16777215 && !args[0].match(/^#(?:[0-9a-fA-F]{3}){1,2}$/gi)) return Messages.warning(message, "That is not a color!", {timeout: 2500});
		message.edit(new MessageEmbed({
			color: parseInt(args[0]) || args[0],
			title: args[0]
		}).uri).catch();
	}
}