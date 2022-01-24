const axios = require("axios");
const FormData = require("form-data");
const config = require("../config.json");
const {textReply} = require("../core/Messages");

module.exports = {
	name: "insult",
	async execute(message) {
		const delay = ms => new Promise(res => setTimeout(res, ms));

		message.channel.startTyping();
		if (!this.phases) {
			const formData = new FormData();
			formData.append("api_option", "show_paste");
			formData.append("api_dev_key", config.insult.pastebin_dev_key);
			formData.append("api_user_key", config.insult.pastebin_user_key);
			formData.append("api_paste_key", config.insult.pastebin_paste_key);
			await axios.post("https://pastebin.com/api/api_post.php", formData, {
				headers: formData.getHeaders()
			}).then(res => {
				this.phases = res.data.split("\n");
				this.last50 = [];
			}).catch(err => {
				console.error(err);
			})
		}

		let insult = this.phases[Math.floor(Math.random() * this.phases.length)];

		if (this.last50.length > 50) this.last50.shift();
		while (this.last50.includes(insult)) {
			const index = this.phases.indexOf(insult);
			insult = index === this.phases.length - 1 ? this.phases[0] : this.phases[index + 1];
		}
		this.last50.push(insult);

		await delay(Math.floor(Math.random() * 2000) + 1000);
		message.channel.stopTyping();
		textReply(message, insult);
	}
}