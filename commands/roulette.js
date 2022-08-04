const Messages = require("../core/Messages");

module.exports = {
	name: "roulette",
	aliases: ["russian"],
	
	started: false,
	async execute(message, args) {
		if (args[0] == "stop") {
			Messages.completed(message, "Game stoped!");
			return this.started = false;
		}
		if (args[0] == "spin") {
			Messages.warning(message, "Spining the wheel!");
			return this.current = Math.floor(Math.random()*6);
		}

		if (!this.started) {
			this.started = true;
			this.current = Math.floor(Math.random()*6);
			console.log("Selected: ", this.current);
			return Messages.warning(message, "Game started!");
		}

		if (this.current === 5) {
			return Messages.error(message, `${message.author.tag} got his brains out!`, {callback: embed => {
				message.edit(embed).then(_=>{
					this.started = false;
				}).catch()
			}})
		}
		this.current++;
		Messages.regular(message, "Nice try!")
	}
}