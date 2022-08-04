module.exports = {
	name: "type",
	args: true,
	aliases: ["write"],
	async execute(message, args) {
		const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
		const text = args.join(" ");
		let out="";
		for (const char of text) {
			out+=char;
			if (char === " ") continue;
			message.edit(out).catch();
			await delay(1200);
		}
	}
}