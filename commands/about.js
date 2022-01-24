const MessageEmbed = require("../modules/MessageEmbed");

module.exports = {
	name: "about",
	aliases: ["author", "creator", "github"],
	execute(message, args) {
		message.edit(new MessageEmbed({
			color: "#268bff",
			title: "Github repository",
			description: "Bot was developed by Olejka#4300 for personal usage.",
			url: require("../package.json").repository.raw,
			footer: {
				text: "P.s. use at your own risk :)"
			}
		}).uri).catch();
	}
}