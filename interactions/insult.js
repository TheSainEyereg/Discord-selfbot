const axios = require("axios");
const FormData = require("form-data");
const config = require("../config.json");
const {textReply} = require("../core/Messages");

module.exports = {
	name: "insult",
	type: "message",
	start(message) {},
	stop(message) {},


	last50: [],
	async getData() {
		const formData = new FormData();
		formData.append("api_option", "show_paste");
		formData.append("api_dev_key", config.insult.pastebin_dev_key);
		formData.append("api_user_key", config.insult.pastebin_user_key);
		formData.append("api_paste_key", config.insult.pastebin_paste_key);
		await axios.post("https://pastebin.com/api/api_post.php", formData, {
			headers: formData.getHeaders()
		}).then(res => {
			this.phases = res.data.split("\n");
			this.getTimestamp = new Date().getTime();
		}).catch(err => {
			console.error(err);
		})
	},
	async execute(message) {
		const delay = ms => new Promise(res => setTimeout(res, ms));
		if (this.typing) return;

		message.channel.startTyping();
		this.typing = true;

		if (!this.phases || new Date().getTime() - this.getTimestamp > 5 * 60 * 1000) {
			await this.getData();
		}	

		let insult = this.phases[Math.floor(Math.random() * this.phases.length)];

		while (this.last50.includes(insult)) {
			const index = this.phases.indexOf(insult);
			insult = index === this.phases.length - 1 ? this.phases[0] : this.phases[index + 1];
		}
		if (this.last50.length > 50) this.last50.shift();
		this.last50.push(insult);

		await delay(insult.length * Math.floor(Math.random() * 50 + 50));
		message.channel.stopTyping();
		this.typing = false;
		textReply(message, insult);
	}
};