const axios = require('axios');
const { Attachment } = require('discord.js');

module.exports = {
    regexp: /^(https?:\/\/)?coub\.com\/view\//gi,
    execute(message) {
        const coub = message.content.split(message.content.match(this.regexp)[0])[1].replace("/", "");
        axios.get(`https://coub.com/api/v2/coubs/${coub}`)
        .then(res => {
            const url = res.data.file_versions.share.default;
            const link = `https://coub.com/view/${res.data.permalink}`;
            if (!url || !link) return Messages.error(message, "Error in getting video!", {timeout: 1000});
            message.channel.send(`<${link}>`, new Attachment(url,"coub.mp4")).then(_=>{
                message.channel.stopTyping();
                message.delete().catch();
            }).catch();
        })
        .catch(e => {
            console.log(e);
            return Messages.error(message, "Error in fetching coub info!", {discription: `\`\`\`${e}\`\`\``, timeout: 1000});
        });
    }
}