const { RichEmbed } = require("discord.js")

module.exports = {
	name: "about",
	aliases: ["author", "creator", "github"],
	execute(message, args) {
		message.edit(new RichEmbed({
			color: parseInt("268bff", 16),
			title: "Github repository",
			description: "Bot was developed by Olejka#4300 for personal usage.",
			url: require("../package.json").repository.raw,
			footer: {
				text: "P.s. use at your own risk :)"
			}
		})).catch();
	}
}