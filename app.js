const discord = require('discord.js');
const discordEvents = require('./events/discordEvents'); 

require('dotenv').config();

const client = new discord.Client({intents: 4609});

discordEvents.ready(client);
discordEvents.newMessage(client);
discordEvents.newInteraction(client);
discordEvents.guildCreate(client);

client.login(process.env.DISCORD);