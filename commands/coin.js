const { RichEmbed } = require("discord.js");

module.exports = {
	name: "coin",
	aliases: ["flip"],
	execute(message, args) {
		const result = Math.random();
		message.edit(new RichEmbed({
			title: `You got a **\`${result < 0.5 ? "Head" : "Tail"}\`**`,
			thumbnail: {
				url: `${result < 0.5 ? "https://olejka.ru/s/2c9480c8.png" : "https://olejka.ru/s/6ad26221.png"}`,
			}
		})).catch();
	}
}