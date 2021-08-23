const { RichEmbed } = require("discord.js")

module.exports = {
    name: "eval",
    aliases: ["ex", "exec", "run"],
    execute(message, args) {
        const code = args.join(" ");
        try {
            const out = eval(code);
            message.edit(new RichEmbed({
                color: parseInt("3af06a", 16),
                title: `:white_check_mark: Completed!`,
                description: `${out ? out.toString() : "`No out ¯\\_(ツ)_/¯`"}`
            })).then(message => setTimeout(_=>{message.delete()}, 2000));
        } catch (e) {
            message.edit(new RichEmbed({
                color: parseInt("eb0c0c", 16),
                title: `:octagonal_sign: Error in eval!`,
                description: `\`\`\`${e}\`\`\``
            })).then(message => setTimeout(_=>{message.delete()}, 2000));
        }
    }
}