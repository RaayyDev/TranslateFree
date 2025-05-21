const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const translator = require('google-translate-api-x');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log(`Bot listo como ${client.user.tag}`);
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    const channelsPath = path.join(__dirname, 'channels.json');
    const configPath = path.join(__dirname, 'config.json');
    let channelsConfig = {};
    let globalConfig = {};
    if (fs.existsSync(channelsPath)) {
        try {
            channelsConfig = JSON.parse(fs.readFileSync(channelsPath, 'utf8'));
        } catch (e) {
            console.error('Error leyendo channels.json:', e);
        }
    }
    if (fs.existsSync(configPath)) {
        try {
            globalConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        } catch (e) {
            console.error('Error leyendo config.json:', e);
        }
    }

    const channelConfig = channelsConfig[message.channel.id];
    if (channelConfig) {
        const idiomas = {
            es: ['es', 'español', 'spanish'],
            en: ['en', 'ingles', 'english'],
            ru: ['ru', 'ruso', 'russian'],
            fr: ['fr', 'francés', 'french'],
            de: ['de', 'alemán', 'german'],
            it: ['it', 'italiano', 'italian'],
            pt: ['pt', 'portugués', 'portuguese'],
            ja: ['ja', 'japonés', 'japanese'],
            zh: ['zh', 'chino', 'chinese']
        };
        /**
         * @param {string} input
         * @returns {string}
         */
        function getLangCode(input) {
            if (!input) return '';
            input = input.toLowerCase();
            for (const [code, names] of Object.entries(idiomas)) {
                if (names.includes(input)) return code;
            }
            return input; 
        }
        const idiomaBaseCode = getLangCode(channelConfig.idiomaBase);
        const idiomaDestinoCode = getLangCode(channelConfig.idiomaDestino);
        if (!idiomaBaseCode || !idiomaDestinoCode) return;

        try {
            const detected = await translator(message.content, { to: idiomaBaseCode });
            const fromLang = detected.from.language.iso;
            let targetLang = null;
            if (fromLang === idiomaBaseCode && idiomaBaseCode !== idiomaDestinoCode) {
                targetLang = idiomaDestinoCode;
            } else if (fromLang === idiomaDestinoCode && idiomaBaseCode !== idiomaDestinoCode) {
                targetLang = idiomaBaseCode;
            }
            if (targetLang) {
                const result = await translator(message.content, { from: fromLang, to: targetLang });
                if (result && result.text && result.text !== message.content) {
                    if (globalConfig.translateWebhook) {
                        try {
                            await message.delete();
                            let webhooks = await message.channel.fetchWebhooks();
                            let webhook = webhooks.find(wh => wh.name === 'TranslateFreeBot');
                            if (!webhook) {
                                webhook = await message.channel.createWebhook({
                                    name: 'TranslateFreeBot',
                                    avatar: client.user.displayAvatarURL()
                                });
                            }
                            await webhook.send({
                                content: result.text,
                                username: message.member ? message.member.displayName : message.author.username,
                                avatarURL: message.author.displayAvatarURL()
                            });
                        } catch (whErr) {
                            console.error('Error enviando por webhook:', whErr);
                        }
                    } else {
                        await message.reply({
                            content: `**Traducción** (${fromLang} → ${targetLang}):\n${result.text}`,
                            allowedMentions: { repliedUser: false }
                        });
                    }
                }
            }
        } catch (err) {
            console.error('Error de traducción:', err);
        }
    }

    if (!message.content.startsWith('!')) return;
    const args = message.content.slice(1).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);
    if (!command) return;
    try {
        await command.execute(message, args);
    } catch (error) {
        console.error(error);
        await message.reply({ content: 'Hubo un error al ejecutar ese comando.', allowedMentions: { repliedUser: false } });
    }
});

client.login('TU_TOKEN_AQUI');