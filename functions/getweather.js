const { EmbedBuilder } = require('discord.js');
const { getWeather } = require('../libs/weather.js');
const { generateLink } = require('../libs/imageKit.js');
const { getTypes, addToLogs } = require('../libs/botTools.js');

async function getweather(interaction, client) {
    await interaction.deferReply();

    const response = await getWeather(interaction.options.get('city').value);

    const type = getTypes(response.current.condition.code);

    if (response.current.is_day == 0) {
        color = type.night.color.slice(1);
        condition = type.night.name
        mapStyle = "element:geometry|color:0x242f3e&style=element:labels.text.fill|color:0x746855&style=element:labels.text.stroke|color:0x242f3e&style=feature:water|element:geometry|color:0x17263c&style=feature:road|element:geometry|color:0x38414e&style=feature:road|element:geometry.stroke|color:0x212a37&style=feature:road.highway|element:geometry|color:0x746855&style=feature:road.highway|element:geometry.stroke|color:0x1f2835";
        dayStatus = "Night";
    }
    else {
        color = type.day.color.slice(1);
        condition = type.day.name
        dayStatus = "Day";
        mapStyle = "";
    }

    mapSize = "500x300";
    mapZoom = "6";
    mapMarkers = "color:0x" + color + "|label:" + response.location.name.slice(0,1).toUpperCase() + "|" + response.location.name;
    mapType = "roadmap";

    mapUrl = "https://maps.googleapis.com/maps/api/staticmap?size=" + mapSize + "&key=" + process.env.GOOGLE + "&zoom=" + mapZoom + "&center=" + response.location.name + "&markers=" + mapMarkers + "&maptype=" + mapType + "&style=" + mapStyle;

    mapLink = await generateLink(mapUrl);

    if (response.location.region) {
        location = response.location.region + ", " + response.location.country;
    }
    else {
        location = response.location.country;
    }

    const embed = new EmbedBuilder()
        .setColor(parseInt(color, 16))
        .setTitle(response.location.name + "'s weather")
        .setDescription('This is the current weather in ' + response.location.name + '.\nCurrently it is ' + dayStatus + '.')
        .setThumbnail("https://" + response.current.condition.icon.slice(2))
        .addFields(
            { name: "Location", value: location },
            { name: 'Condition', value: response.current.condition.text},
            { name: 'Temperature', value: response.current.temp_c + "°C", inline: true },
            { name: 'Felt temperature', value: response.current.feelslike_c + "°C", inline: true },
            { name: 'Wind speed', value: response.current.wind_kph + "Km/h", inline: true },
            { name: 'Humidity', value: response.current.humidity + "%", inline: true },
            { name: 'Precipitation', value: response.current.precip_mm + "mm", inline: true },
            { name: 'Cloud cover', value: response.current.cloud + "%", inline: true },

        )
        .setImage(mapLink)
        .setTimestamp()
        .setFooter({ text: 'Using weatherApi, Google Cloud API and imageKit API', iconURL: "https://" + response.current.condition.icon.slice(2) });

    interaction.editReply({ embeds: [embed] });

    addToLogs("--> Sent weather for " + response.location.name + " to " + interaction.user.tag);
    console.log("--> Sent weather for " + response.location.name + " to " + interaction.user.tag);

}

module.exports = getweather;