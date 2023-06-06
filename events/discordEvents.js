const discord = require('discord.js');
const commands = require('../commands/commands');

module.exports = {
    newMessage: (client) => {
        client.on('messageCreate', async msg => {
        });
    },


    newInteraction: (client) => {
        client.on('interactionCreate', async interaction => {
        });
    },

    ready: (client) => {
        client.on('ready', () => {
            console.log(`[Discord] Logged in as ${client.user.tag} !`);
            //client.user.setPresence({ activities: [{ name: 'la belle chaise', type: 3 }] });

            const rest = new discord.REST({ version: '10' }).setToken(process.env.DISCORD);

            client.guilds.cache.forEach(async (guild) => {
                try {
                    await rest.put(
                        discord.Routes.applicationGuildCommands(process.env.BOTID, guild.id),
                        { body: commands },
                    );

                    console.log('[Discord] Successfully reloaded application (/) commands for ' + guild.name + '.');
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

                console.log('[Discord] Successfully reloaded application (/) commands for ' + guild.name + '.');
            } catch (error) {
                console.error(error);
            }
        });
    },
}