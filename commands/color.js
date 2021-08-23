const { RichEmbed } = require("discord.js")

module.exports = {
    name: "color",
    args: true,
    aliases: ["hex"],
    execute(message, args) {
        const color = parseInt(args[0].replace("#", ""), 16)
        message.edit(new RichEmbed({
            color: color,
            title: args[0].includes("#") ? args[0] : "#"+args[0]
        })).catch();
    }
}