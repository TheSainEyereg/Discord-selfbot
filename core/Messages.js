const { RichEmbed } = require("discord.js");

module.exports = {
	regular(message, text, opt) {
		const embed = new RichEmbed().setColor("#5926ff");
		opt && opt.big ? embed.setTitle(text) : embed.setDescription(text);
		if (opt && opt.timeout && !opt.callback) setTimeout(_=>{message.delete().catch()}, opt.timeout);
		if (opt && opt.callback) return opt.callback(embed);
		message.edit(embed).catch();
	},
	completed(message, text, opt) {
		const embed = new RichEmbed().setColor("#3af06a").setTitle(text);
		if (opt && opt.description) embed.setDescription(opt.description);
		if (opt && opt.timeout && !opt.callback) setTimeout(_=>{message.delete().catch()}, opt.timeout);
		if (opt && opt.callback) return opt.callback(embed);
		message.edit(embed).catch();
	},
	warning(message, text, opt) {
		const embed = new RichEmbed().setColor("#f0e43a").setTitle(text);
		if (opt && opt.description) embed.setDescription(opt.description);
		if (opt && opt.timeout && !opt.callback) setTimeout(_=>{message.delete().catch()}, opt.timeout);
		if (opt && opt.callback) return opt.callback(embed);
		message.edit(embed).catch();
	},
	error(message, text, opt) {
		const embed = new RichEmbed().setColor("#eb0c0c").setTitle(text);
		if (opt && opt.description) embed.setDescription(opt.description);
		if (opt && opt.timeout && !opt.callback) setTimeout(_=>{message.delete().catch()}, opt.timeout);
		if (opt && opt.callback) return opt.callback(embed);
		message.edit(embed).catch();
	}
}