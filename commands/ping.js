const {textRegular, regular} = require("../core/Messages.js");

module.exports = {
	name: "ping",
	args: false,
	aliases: ["latency"],
	async execute(message, args) {
		regular(message, `Pong! Latency is ${Date.now() - message.createdTimestamp}ms`, {timeout: 3000});
	}
}