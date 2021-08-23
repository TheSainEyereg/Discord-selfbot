const { RichEmbed } = require("discord.js")

module.exports = {
    name: "embed",
    execute(message, args) {
        message.edit(new RichEmbed({
            color: parseInt("5926ff", 16),
            title: args.join(" "),
        })).error();
    }
}