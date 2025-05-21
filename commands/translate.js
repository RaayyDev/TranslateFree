module.exports = {
    name: 'translate',
    aliases: ['traducir', 'traduce'],
    description: 'Translate a message to another language',
    execute(message, args) {
        const idiomaBase = args[0];
        const idiomaDestino = args[1];
        if (!idiomaBase || !idiomaDestino) {
            return message.reply('Por favor, proporciona el idioma base y el idioma de destino.');
        }

        const fs = require('fs');
        const path = require('path');
        const channelsPath = path.join(__dirname, '../channels.json');
        let channelsConfig = {};
        if (fs.existsSync(channelsPath)) {
            channelsConfig = JSON.parse(fs.readFileSync(channelsPath, 'utf8'));
        }
        channelsConfig[message.channel.id] = {
            idiomaBase,
            idiomaDestino
        };
        fs.writeFileSync(channelsPath, JSON.stringify(channelsConfig, null, 2));
        message.reply(`Canal configurado para traducción automática entre ${idiomaBase} y ${idiomaDestino}.`);
    }
};