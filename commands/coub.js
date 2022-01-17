const axios = require("axios");
const { Attachment } = require("discord.js");
const Messages = require("../core/Messages");

module.exports = {
	name: "coub",
	execute(message, args) {
		message.channel.startTyping();
		
		const communities = ["anime", "animals-pets", "blogging", "standup-jokes", "mashup", "movies", "gaming", "cartoons", "art", "live-pictures", "music", "news", "sports", "science-technology", "food-kitchen", "celebrity", "nature-travel", "fashion", "dance", "cars", "memes", /*"nsfw"*/];
		const order = {
			"daily": "daily?",
			"rising": "rising?",
			"fresh": "fresh?",
			"top": "fresh?order_by=likes_count&",
			"views": "fresh?order_by=views_count&"
		};

		if (!communities.includes(args[0]) || !args[0]) return Messages.warning(message, "Unknown category!", {description: `\`\`\`communities\`\`\``, timeout: 1500});

		const correct = Object.keys(order).includes(args[1]) && args[1];

		const per_page = 25;
		axios.get(`https://coub.com/api/v2/timeline/community/${args[0]}/${correct ? order[args[1]] : "daily?"}per_page=${per_page}`)
		.then(res => {
			const coubs = res.data.coubs;
			if (!coubs) return Messages.error(message, "Error in getting coubs list!", {timeout: 1000});
			const coub = coubs[Math.floor(Math.random()*per_page)].id;
			if (!coub) return Messages.error(message, "Error in getting coub list!", {timeout: 1000});
			axios.get(`https://coub.com/api/v2/coubs/${coub}`)
			.then(res => {
				const url = res.data.file_versions.share.default;
				const link = `https://coub.com/view/${res.data.permalink}`;
				if (!url || !link) return Messages.error(message, "Error in getting video!", {timeout: 1000});
				message.channel.send(`<${link}>`, new Attachment(url,"coub.mp4")).then(_=>{
					message.channel.stopTyping();
					message.delete().catch();
				}).catch();
			})
			.catch(e => {
				return Messages.error(message, "Error in fetching coub info!", {discription: `\`\`\`${e}\`\`\``, timeout: 1000});
			});
		})
		.catch(e => {
			return Messages.error(message, "Error in fetching coubs list!", {discription: `\`\`\`${e}\`\`\``, timeout: 1000});
		});
	}
};