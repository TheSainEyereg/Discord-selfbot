const { RichEmbed } = require("discord.js");

module.exports = {
    name: "type",
    aliases: ["write"],
    async execute(message, args) {
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
        if(!args[0]) return message.edit(new RichEmbed(
            {
                color: parseInt("eb0c0c", 16),
                title: `Nothing to type!`,
            }
        )).then(m => setTimeout(_=>{m.delete().error()}, 1000)).error();
        const text = args.join(" ");
        let out="";
        for (const char of text) {
            out+=char;
            message.edit(out).error();
            await delay(1200);
        }
    }
}