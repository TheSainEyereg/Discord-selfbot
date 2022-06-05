const MessageEmbed = require("../modules/MessageEmbed.js");
const axios = require("axios");

module.exports = {
	regular(message, text, options) {
		const embed = new MessageEmbed().setColor("#5926ff");
		options?.big ? embed.setTitle(text) : embed.setDescription(text);
		if (options?.timeout && !options?.callback) setTimeout(_=>{message.delete().catch()}, options.timeout);
		if (options?.callback) return options.callback(embed.uri);
		return message.edit(embed.uri).catch();
	},
	completed(message, text, options) {
		const embed = new MessageEmbed().setColor("#3af06a").setTitle(text);
		if (options?.description) embed.setDescription(options.description);
		if (options?.timeout && !options?.callback) setTimeout(_=>{message.delete().catch()}, options.timeout);
		if (options?.callback) return options.callback(embed.uri);
		return message.edit(embed.uri).catch();
	},
	warning(message, text, options) {
		const embed = new MessageEmbed().setColor("#f0e43a").setTitle(text);
		if (options?.description) embed.setDescription(options.description);
		if (options?.timeout && !options?.callback) setTimeout(_=>{message.delete().catch()}, options.timeout);
		if (options?.callback) return options.callback(embed.uri);
		return message.edit(embed.uri).catch();
	},
	error(message, text, options) {
		const embed = new MessageEmbed().setColor("#eb0c0c").setTitle(text);
		if (options?.description) embed.setDescription(options.description);
		if (options?.timeout && !options?.callback) setTimeout(_=>{message.delete().catch()}, options.timeout);
		if (options?.callback) return options.callback(embed.uri);
		return message.edit(embed.uri).catch();
	},

	textRegular(message, text, options) {
		if (options?.timeout) setTimeout(_=>{message.delete().catch()}, options.timeout);
		return message.edit(options?.big ? "**"+text+"**" : text).catch();
	},
	textCompleted(message, text, options) {
		if (options?.timeout) setTimeout(_=>{message.delete().catch()}, options.timeout);
		return message.edit(`${options?.color ? ":green_circle:" : ":white_check_mark:"} **${text}** ${options?.description ? "\n"+options.description : ""}`).catch();
	},
	textWarning(message, text, options) {
		if (options?.timeout) setTimeout(_=>{message.delete().catch()}, options.timeout);
		return message.edit(`${options?.color ? ":yellow_circle:" : ":warning:"} **${text}** ${options?.description ? "\n"+options.description : ""}`).catch();
	},
	textError(message, text, options) {
		if (options?.timeout) setTimeout(_=>{message.delete().catch()}, options.timeout);
		return message.edit(`${options?.color ? ":red_circle:" : ":x:"} **${text}** ${options?.description ? "\n"+options.description : ""}`).catch();
	}
}