const axios = require("axios");
const Messages = require("../core/Messages");

module.exports = {
	name: "ascii",
	args: true,
	execute(message, args) {
		axios.get(`https://api.olejka.ru/v2/figlet?text=${args.join(" ")}`)
		.then(res => {
			Messages.textRegular(message, `\`\`\`\n${res.data.text}\`\`\``);
		})
		.catch(e => {
			Logs.critical(`${this.name} command`, `Error in ascii convertation: ${e}`);
			return Messages.textError(message, `${l.error}: \`\`\`${e.response?.data?.error || e}\`\`\``);
		});
	}
};