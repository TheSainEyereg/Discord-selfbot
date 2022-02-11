const Messages = require("../core/Messages");

module.exports = {
	name: "interaction",
	args: true,
	aliases: ["ui"],
	async execute(message, args) {
		const {client, client: {interactions, userInteractions}} = message;

		// Interaction has start and stop methods that requires message as parameter.
		// Example: >interaction [USER_ID] [add|remove|list] [interaction_name]
		
		const user = message.mentions.users.first() || client.users.find(u => u.id == args[0]);
		const action = args[1];
		const interactionName = args.slice(2).join(" ");

		if (!user) return Messages.error(message, "No such user!", {timeout: 2500});
		if (user.bot || user.id === client.user.id) return Messages.error(message, "You can't add interactions to yourself or bots!", {timeout: 2500});
		if (!["add", "remove", "list"].includes(action)) return Messages.error(message, "Invalid action!", {timeout: 2500});

		const interactionsList = userInteractions.get(user.id) || [];

		if (action === "list") {
			if (!interactions) return Messages.error(message, "No interactions found!", {timeout: 2500});
			return Messages.completed(message, `Interactions for ${user.tag}: ${interactionsList.join(", ")}`);
		}

		if (!interactionName) return Messages.error(message, "Interaction name required!", {timeout: 2500});
		const interaction = interactions.get(interactionName);

		if (action === "add") {
			if (!interaction) return Messages.error(message, "No such interaction found!", {timeout: 2500});
			if (interactionsList.includes(interactionName)) return Messages.error(message, "Interaction already added!", {timeout: 2500});
			if (interaction.type === "regular") {
				try {
					interaction.start(message, user);
				} catch (e) {
					console.error(e);
					return Messages.error(message, "Interaction failed to start!", {timeout: 2500});
				}
			}
			interactionsList.push(interactionName);
			userInteractions.set(user.id, interactionsList);
			return Messages.completed(message, `Added interaction ${interactionName} to ${user.tag}`, {timeout: 2500});
		}

		if (action === "remove") {
			if (interactionName === "all") {
				interactionsList.forEach(i => {
					const interaction = interactions.get(i);
					if (interaction.type === "regular") {
						try {
							interaction.stop(message, user);
						} catch (e) {
							console.error(e);
						}
					}
				});
				userInteractions.delete(user.id);
				return Messages.completed(message, `Removed all interactions for ${user.tag}`, {timeout: 2500});
			}
			if (!interactionsList.includes(interactionName)) return Messages.error(message, "Interaction not found!", {timeout: 2500});
			if (interaction.type === "regular") {
				try {
					interaction.stop(message, user);
				} catch (e) {
					console.error(e);
					Messages.error(message, "Interaction failed to stop!", {timeout: 2500});
				}
			}
			interactionsList.splice(interactionsList.indexOf(interactionName), 1);
			userInteractions.set(user.id, interactionsList);
			return Messages.completed(message, `Removed interaction ${interactionName} from ${user.tag}`, {timeout: 2500});
		}

	}
}