# Discord selfbot

## How to use
To host this bot yourself:
1. Install NodeJS 14.0.0 or higher.
2. Clone and install dependencies.
```sh
git clone https://github.com/TheSainEyereg/Discord-selfbot.git
cd Discord-selfbot
npm i
```
1. **Copy files from `.djs11_fix/` to `node_modules/discord.js/src/client/` with replace!**
2. Create `config.json` like this: 
```json
{
	"token": "YourAccountToken",
	"prefix": ">",
	"insult": {
		"pastebin_dev_key": "pastebin_dev_key",
		"pastebin_user_key": "pastebin_user_key",
		"pastebin_paste_key": "pastebin_paste_key"
	}
}
```
_p.s. "others" is another users who can use YOU_

5. Run selfbot by typing `npm start` or `node index.js` 

# ⚠⚠⚠ NOTE that selfboting against Discord terms of services! ⚠⚠⚠<br>**Use at your own risk!**