const MessageEmbed = require("../modules/MessageEmbed");

module.exports = {
	regexp: /^#(?:[0-9a-fA-F]{3}){1,2}$/gi,
	execute(message) {
		message.edit(new MessageEmbed({
			color: message.content,
			title: message.content
		}).uri).catch();
	}
}