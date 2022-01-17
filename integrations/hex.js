const {RichEmbed} = require("discord.js");

module.exports = {
	regexp: /^#(?:[0-9a-fA-F]{3}){1,2}$/gi,
	execute(message) {
		const string = message.content.slice(1);
		const color = string.length == 6 ? parseInt(string, 16) : parseInt(string, 16)**2+parseInt(string, 16)*2;
		message.edit(new RichEmbed({
			color: color,
			title: "#"+string
		})).catch();
	}
}