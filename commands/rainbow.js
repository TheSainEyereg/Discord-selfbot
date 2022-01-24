const MessageEmbed = require("../core/MessageEmbed");
const Messages = require("../core/Messages");

module.exports = {
	name: "rainbow",
	args: true,
	aliases: ["awesome", "rgb"],
	async execute(message, args) {
		//return Messages.warning(message, "Rainbow command issuinng degraded performance due to new Embeds.", {timeout: 5000});
		const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
		for (let i=0; i<5; i++) {
			message.edit(new MessageEmbed({
				color: Math.floor(Math.random()*16777215),
				title: args.join(" ")
			}).uri).catch();
			await delay(3000);
		};
	}
}