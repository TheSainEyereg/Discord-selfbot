const { RichEmbed } = require("discord.js")

module.exports = {
    name: "color",
    args: true,
    aliases: ["hex"],
    execute(message, args) {
        args[0]=args[0].replace("#", "");
        const color = parseInt(args[0]) ? args[0] : args[0].length == 6 ? parseInt(args[0], 16) : parseInt(args[0], 16)**2+parseInt(args[0], 16)*2;
        console.log(color);
        message.edit(new RichEmbed({
            color: color,
            title: args[0]
        })).catch();
    }
}