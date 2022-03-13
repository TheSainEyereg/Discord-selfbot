const axios = require("axios");
const Messages = require("../core/Messages");

module.exports = {
	name: "ascii",
	args: true,
	execute(message, args) {
		axios.get(`https://artii.herokuapp.com/make?text=${args.join(" ")}`)
		.then(res => {
			Messages.textRegular(message, `\`\`\`${res.data}\`\`\``);
		})
		.catch(e => {
			Messages.textError(message, "Something went wrong!", {description: e, timeout: 2500});
		});
	}
};