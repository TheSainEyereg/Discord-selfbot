const MessageEmbed = require("../core/MessageEmbed");
const Messages = require("../core/Messages");

module.exports = {
	name: "rainbow",
	args: true,
	aliases: ["awesome", "rgb"],
	async execute(message, args) {
		//return Messages.warning(message, "Rainbow command issuinng degraded performance due to new Embeds.", {timeout: 5000});
		const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

		async function editEmbed() {
			message.edit(new MessageEmbed({
				color: Math.floor(Math.random()*16777215),
				title: args.join(" ")
			}).uri).catch();
			await delay(2500);
		}

		const circles = [":white_circle:",":red_circle:",":orange_circle:",":yellow_circle:",":green_circle:",":blue_circle:",":purple_circle:",":brown_circle:",":black_circle:"]
		let circle;
		async function editText() {
			let circle_i = Math.floor(Math.random()*circles.length);
			if (circle_i === circles.indexOf(circle)) circle_i > circles.length-1 ? circle_i = 0 : circle_i++;
			circle = circles[circle_i];
			message.edit(`${circle} ${args.join(" ")} ${circle}`).catch();
			await delay(1000);
		}

		for (let i=0; i<5; i++) await editText();
		message.delete().catch();
	}
}