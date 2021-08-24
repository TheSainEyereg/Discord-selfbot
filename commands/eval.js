const Messages = require("../core/Messages");

module.exports = {
    name: "eval",
    args: true,
    aliases: ["execute"],
    execute(message, args) {
        const code = args.join(" ");
        try {
            const out = eval(code);
            if (!code.includes("message.edit") && !code.includes("Messages")) Messages.completed(message, "Completed!", {description: `${out ? `\`\`\`${out.toString()}\`\`\`` : "`No out ¯\\_(ツ)_/¯`"}`, timeout: 2000});

        } catch (e) {
            Messages.error(message, "Error in eval!", {description: `\`\`\`${e}\`\`\``, timeout: 2000});
        }
    }
}