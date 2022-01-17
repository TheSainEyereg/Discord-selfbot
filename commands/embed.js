const Messages = require("../core/Messages");

module.exports = {
	name: "embed",
	args: true,
	execute(message, args) {
		Messages.regular(message, args.join(" "), {big:true});
	}
}