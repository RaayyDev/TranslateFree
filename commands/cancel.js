module.exports = {
    name: 'cancel',
    aliases: ['cancelar', 'stop'],
    description: 'Desactiva la traducción automática en este canal',
    execute(message, args) {
        const fs = require('fs');
        const path = require('path');
        const channelsPath = path.join(__dirname, '../channels.json');
        let channelsConfig = {};
        if (fs.existsSync(channelsPath)) {
            channelsConfig = JSON.parse(fs.readFileSync(channelsPath, 'utf8'));
        }
        if (channelsConfig[message.channel.id]) {
            delete channelsConfig[message.channel.id];
            fs.writeFileSync(channelsPath, JSON.stringify(channelsConfig, null, 2));
            message.reply('La traducción automática ha sido desactivada en este canal.');
        } else {
            message.reply('Este canal no está configurado para traducción automática.');
        }
    }
};
