const Messages = require("../core/Messages");

module.exports = {
	name: "eval",
	args: true,
	aliases: ["execute"],
	execute(message, args) {
		const code = args.join(" ").replace(/```([a-z0-9]+\n)?(.*?)```/gs, "$2");
		const isPromise = v => typeof v === "object" && typeof v.then === "function";
		const dontSend = code.includes("message.edit(") || code.includes("message.delete(") || code.includes("Messages.")
		try {
			const evaled = eval(code);
			if (isPromise(evaled)) {
				evaled.then(r => {
					if (dontSend) return;
					Messages.textCompleted(message, "Promise resolved!", {
						description: `\`\`\`\n${r}\n\`\`\``,
						timeout: 4000
					});
				}).catch(e => {
					Messages.textError(message, "Promise rejected!", {
						description: `\`\`\`\n${e}\n\`\`\``,
						timeout: 4000
					});
				});
			} else {
				if (dontSend) return;
				Messages.textCompleted(message, "Eval successful!", {
					description: `\`\`\`\n${evaled}\n\`\`\``,
					timeout: 4000
				});
			}
		} catch (e) {
			Messages.textError(message, "Eval error!", {description: `\`\`\`${e}\`\`\``, timeout: 2500});
		}
	}
}