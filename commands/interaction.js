const Messages = require("../core/Messages");

module.exports = {
	name: "interaction",
	args: true,
	aliases: ["ui"],
	async execute(message, args) {
		const {client} = message;

		if (!args[0] || !parseInt(args[0])) return Messages.error(message, "Invalid arguments (USER_ID)!", {timeout: 2500});
		if (!["add", "remove", "list"].includes(args[1])) return Messages.error(message, "Invalid arguments (add/remove/list)!", {timeout: 2500});
		if ((!args[2]) && args[0] != "list") return Messages.error(message, "Invalid arguments (INTERACTION_NAME)!", {timeout: 2500});
		
		const user = await client.users.find(u => u.id == args[0]);
		if (!user) return Messages.error(message, "No such user!", {timeout: 2500});
		if (user.bot) return Messages.error(message, "Bots can't have interactions!", {timeout: 2500});

		let interactions = client.userInteractions.get(user.id);
		if (!interactions) interactions = [];

		if (args[1] == "add") {
			if (!client.interactions.has(args[2])) return Messages.error(message, "No such interaction!", {timeout: 2500});
			if (interactions.includes(args[2])) return Messages.warning(message, "Interaction already exists!", {timeout: 2500});
			interactions.push(args[2]);
			client.userInteractions.set(user.id, interactions);
			return Messages.completed(message, "Added interaction!", {timeout: 2500});
		}
		if (args[1] == "remove") {
			if (!client.interactions.has(args[2]) && args[2] != "all") return Messages.error(message, "No such interaction!", {timeout: 2500});
			if (args[2] == "all") {
				if (interactions.length == 0) return Messages.warning(message, "User has no interactions!", {timeout: 2500});
				client.userInteractions.set(user.id, []);
				return Messages.completed(message, "Removed all interactions!", {timeout: 2500});
			}
			if (!interactions.includes(args[2])) return Messages.warning(message, "Interaction does not exist!", {timeout: 2500});
			interactions.splice(interactions.indexOf(args[2]), 1);
			client.userInteractions.set(user.id, interactions);
			return Messages.completed(message, "Removed interaction!", {timeout: 2500});
		}
		if (args[1] == "list") {
			if (interactions.length == 0) return Messages.warning(message, "No interactions!", {timeout: 2500});
			return Messages.completed(message, "Interactions:", {description: interactions.join(", "), timeout: 2500});
		}
		
	}
}