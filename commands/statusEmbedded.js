const Discord = require('discord.js');
const Gamedig = require('gamedig');

module.exports = {
    name: '!Lost Island',
    description: 'emdbedded server stats',
    execute(msg, args, ipAddress, port) {
        Gamedig.query({
            type: 'arkse',
            host: ipAddress,
            port: port,
            maxAttempts: 2
          }).then( state => {
            const onlineEmbed = new Discord.MessageEmbed()
            .setColor('#009900')
            .setTitle(`${state.map.replace("_P", "")} server stats`)
            .setThumbnail('https://cdn.discordapp.com/attachments/718600522516529172/719030410553589781/maxresdefault.png')
            .addFields(
                { name: 'Server status', value: 'Online' },
                { name: 'Players', value: `${state.players.length} of ${state.maxplayers}`},
                { name: 'Day', value: state.raw.rules.DayTime_s, inline: true },
            ).setTimestamp();
    
            msg.channel.send(onlineEmbed);
          }).catch( error => {
            const offlineEmbed = new Discord.MessageEmbed()
            .setColor('#009900')
            .setTitle(`Valguero server stats`)
            .setThumbnail('https://cdn.discordapp.com/attachments/718600522516529172/719030410553589781/maxresdefault.png')
            .addField('Server status', 'Offline')
            .setTimestamp();

            msg.channel.send(offlineEmbed);
          });
       
        }
}

