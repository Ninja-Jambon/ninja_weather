const discord = require('discord.js');
const commands = require('../commands/commands');

require('dotenv').config();

const getweather = require('../functions/getweather');

module.exports = {
    newMessage: (client) => {
        client.on('messageCreate', async msg => {
        });
    },


    newInteraction: (client) => {
        client.on('interactionCreate', async interaction => {
            if (!interaction.isCommand()) return;

            if (interaction.commandName === 'getweather') {
                getweather(interaction, client);
            }
        });
    },

    ready: (client) => {
        client.on('ready', () => {
            console.log(`--> Logged in as ${client.user.tag} !`);
            client.user.setPresence({ activities: [{ name: 'weather forecast', type: 3 }] });

            const rest = new discord.REST({ version: '10' }).setToken(process.env.DISCORD);

            client.guilds.cache.forEach(async (guild) => {
                try {
                    await rest.put(
                        discord.Routes.applicationGuildCommands(process.env.BOTID, guild.id),
                        { body: commands },
                    );

                    console.log('--> Successfully reloaded application (/) commands for ' + guild.name + '.');
                } catch (error) {
                    console.error(error);
                }
            })
        });
    },

    guildCreate: (client) => {
        client.on('guildCreate', async (guild) => {
            const rest = new discord.REST({ version: '10' }).setToken(process.env.DISCORD);

            try {
                await rest.put(
                    discord.Routes.applicationGuildCommands(process.env.BOTID, guild.id),
                    { body: commands },
                );

                console.log('--> Successfully reloaded application (/) commands for ' + guild.name + '.');
            } catch (error) {
                console.error(error);
            }
        });
    },
}