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
3. **Go to `node_modules/discord.js/src/client/ClientDataManager.js` and comment line 81**
4. Create `config.json` like this: 
```json
{
	"token": "YourAccountToken",
	"prefix": ">",
	"others": ["ID", "ID", "..."]
}
```
_p.s. "others" is another users who can use YOU_

5. Run selfbot by typing `npm start` or `node index.js` 

# ⚠⚠⚠ NOTE that selfboting against Discord terms of services! ⚠⚠⚠<br>**Use at your own risk!**