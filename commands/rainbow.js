const { RichEmbed } = require("discord.js");

module.exports = {
    name: "rainbow",
    args: true,
    aliases: ["awesome", "rgb"],
    async execute(message, args) {
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
        for (let i=0; i<5; i++) {
            const color = Math.floor(Math.random()*16777215)
            message.edit(new RichEmbed({
                color: color,
                title: args.join(" ")
            })).catch();
            await delay(1200);
        };
    }
}