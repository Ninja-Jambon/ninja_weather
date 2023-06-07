const { ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'getweather',
        description: 'Get the weather of a city',
        options: [
            {
                name: 'city',
                description: 'The city you want to get the weather of',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    },
];

module.exports = commands ;