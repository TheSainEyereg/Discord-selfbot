const MessageEmbed = require("../core/MessageEmbed");

module.exports = {
	name: "coin",
	aliases: ["flip"],
	execute(message, args) {
		const result = Math.random();
		message.edit(new MessageEmbed({
			title: `Вам выпал${result < 0.5 ? " орел" : "а решка"}`,
			color: "#ffdb68",
			thumbnail: {
				url: `${result < 0.5 ? "https://olejka.ru/s/2c9480c8.png" : "https://olejka.ru/s/6ad26221.png"}`,
			}
		}).uri).catch();
	}
}