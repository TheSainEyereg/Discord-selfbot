const Messages = require("../core/Messages");

module.exports = {
	name: "eval",
	args: true,
	aliases: ["execute"],
	execute(message, args) {
		const code = args.join(" ");
		const isPromise = v => typeof v === "object" && typeof v.then === "function";
		try {
			const evaled = eval(code);
			if (isPromise(evaled)) {
				evaled.then(r => {
					Messages.textCompleted(message, "Promise resolved!", {
						description: `\`\`\`\n${r}\n\`\`\``,
						timeout: 2500
					});
				}).catch(e => {
					Messages.textError(message, "Promise rejected!", {
						description: `\`\`\`\n${e}\n\`\`\``,
						timeout: 2500
					});
				});
			} else {
				Messages.textCompleted(message, "Eval successful!", {
					description: `\`\`\`\n${evaled}\n\`\`\``,
					timeout: 2500
				});
			}
		} catch (e) {
			Messages.textError(message, "Eval error!", {description: `\`\`\`${e}\`\`\``, timeout: 2500});
		}
	}
}