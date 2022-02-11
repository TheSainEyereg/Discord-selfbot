const axios = require("axios");

module.exports = {
	name: "ringspam",
	type: "regular",

	interval: false,
	recipients: [],

	async execute(message) {
		const token = message.client.token;
		const channel = message.channel.id;

		const recipients = this.recipients;
		
		axios.post(`https://discord.com/api/v9/channels/${channel}/call/ring`,
		{
			recipients
		},
		{
			headers: {
				authorization: token
			}
		}).then(res => {
			axios.post(`https://discord.com/api/v9/channels/${channel}/call/stop-ringing`,
			{
				recipients
			},
			{
				headers: {
					authorization: token
				}
			}).then(res => {}).catch(e => {});
		}).catch(e => {});
	},

	start(message, user) {
		this.recipients.push(user.id);
		if (!this.interval){
			this.interval = setInterval(() => {
				this.execute(message);
			}, 100);
		}
	},
	stop(message, user) {
		this.recipients.splice(this.recipients.indexOf(user.id), 1);
		if (this.recipients.length === 0) {
			clearInterval(this.interval);
			this.interval = false;
		}
	},
};