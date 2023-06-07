const { EmbedBuilder } = require('discord.js');
const { getWeather } = require('../libs/weather.js');
const { generateLink } = require('../libs/imageKit.js');
const { getTypes } = require('../libs/botTools.js');

async function getweather(interaction, client) {
    await interaction.deferReply();

    city = interaction.options.get('city').value;

    response = await getWeather(city);

    city = response.location.name;

    console.log(response);

    const weather = getTypes(response.current.condition.code);

    color = weather.color.slice(1);

    const mapSize = "500x300";
    const mapZoom = "6";
    const mapMarkers = "color:0x" + color + "%7Clabel:" + city.slice(0,1).toUpperCase() + "%7C" + city;
    const mapType = "terrain";
    const mapStyle = "feature:all|element:labels|visibility:off";

    mapUrl = "https://maps.googleapis.com/maps/api/staticmap?size=" + mapSize + "&key=" + process.env.GOOGLE + "&zoom=" + mapZoom + "&center=" + city + "&markers=" + mapMarkers + "&maptype=" + mapType + "&style=" + mapStyle;

    mapLink = await generateLink(mapUrl);

    const embed = new EmbedBuilder()
        .setColor(parseInt(color, 16))
        .setTitle(city + "'s weather")
        //.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
        .setDescription('This is the current weather in ' + city + '.')
        .setThumbnail("https://" + response.current.condition.icon.slice(2))
        .addFields(
            { name: 'Regular field title', value: 'Some value here' },
            { name: '\u200B', value: '\u200B' },
            { name: 'Inline field title', value: 'Some value here', inline: true },
            { name: 'Inline field title', value: 'Some value here', inline: true },
        )
        .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
        .setImage(mapLink)
        .setTimestamp()
        .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

    interaction.editReply({ embeds: [embed] });

}

module.exports = getweather;