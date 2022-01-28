const Messages = require("../core/Messages");

module.exports = {
	name: "avatar",
	args: false,
	execute(message, args) {
		const user = message.mentions.users.first() || message.client.users.find(u => u.username.toLowerCase() == args.join(" ").toLowerCase() || u.id == args[0]) || message.author;
		if (!user) return Messages.error(message, "User was not found.");
		Messages.textRegular(message, user.avatarURL.includes("size") ? user.avatarURL : user.avatarURL + "?size=2048");
	}
};