const Messages = require("../core/Messages");
const MessageEmbed = require("../modules/MessageEmbed");

module.exports = {
	name: "avatar",
	args: false,
	execute(message, args) {
		const user = message.mentions.users.first() || message.client.users.cache.find(u => u.username.toLowerCase() == args.join(" ").toLowerCase() || u.id == args[0]) || message.author;
		if (!user) return Messages.error(message, "User was not found.");
		message.edit(new MessageEmbed({
			color: "#5926ff",
			title: `${user.username}'s avatar`,
			image: {
				url: user.displayAvatarURL({dynamic: true, size: 2048})
			}
		}).uri)
	}
};