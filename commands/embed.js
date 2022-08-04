const Messages = require("../core/Messages");

module.exports = {
	name: "embed",
	args: true,
	execute(message, args) {
		const color = args.length > 1 && args[0].match(/^#(?:[0-9a-fA-F]{3}){1,2}$/gi)?.[0];
		if (color) args.shift();
		
		Messages.regular(message, args.join(" "), {big: true, color});
	}
}