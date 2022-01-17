const { RichEmbed } = require("discord.js")

module.exports = {
	name: "author",
	aliases: ["creator", "github"],
	execute(message, args) {
		message.edit(new RichEmbed({
			color: parseInt("268bff", 16),
			title: "Github repository",
			description: "Bot was developed by Olejka#4300 for personal usage.",
			url: require("../package.json").repository.raw,
			footer: {
				text: "P.s. use at your own risk :)",
				icon_url: "https://cdn.discordapp.com/avatars/388353045500657674/1f6adf045fd1d8e5241075f0da3569eb.webp?size=128"
			}
		})).catch();
	}
}