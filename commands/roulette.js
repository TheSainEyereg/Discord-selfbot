const Messages = require("../core/Messages");

module.exports = {
	name: "roulette",
	aliases: ["russian"],
	async execute(message, args) {
		if (!global.roulette) global.roulette = {started: false};

		if (args[0] == "stop") {
			Messages.completed(message, "Game stoped!");
			return global.roulette.started = false;
		}
		if (args[0] == "spin") {
			Messages.warning(message, "Spining the wheel!");
			return global.roulette.current = Math.floor(Math.random()*6);
		}

		if (!global.roulette.started) {
			global.roulette.started = true;
			global.roulette.selected = 6; //Math.floor(Math.random()*6);
			global.roulette.current = Math.floor(Math.random()*6);
			return Messages.warning(message, "Game started!");
		}

		if (global.roulette.current == global.roulette.selected) {
			return Messages.error(message, `${message.author.tag} got his brains out!`, {callback: embed => {
				message.edit(embed).then(_=>{
					global.roulette.started = false;
				}).catch()
			}})
		}
		global.roulette.current++;
		Messages.regular(message, "Nice try!")
	}
}