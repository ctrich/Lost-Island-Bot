const Discord = require('discord.js');
const Gamedig = require('gamedig');

module.exports = {
    name: '!lostisland',
    description: 'emdbedded server stats',
    execute(msg, args, ipAddress, port) {
        Gamedig.query({
            type: 'arkse',
            host: ipAddress,
            port: port,
            maxAttempts: 2
          }).then( state => {
          console.log(state);
            const onlineEmbed = new Discord.MessageEmbed()
            .setColor('#009900')
            .setTitle(`${state.name}`)
            .setThumbnail('https://media.discordapp.net/attachments/719313280749011074/935141082537275423/unknown.png')
            .addFields(
                { name: 'Server status', value: 'Online' },
                { name: 'Players', value: `${state.players.length} of ${state.maxplayers}`},
                //{ name: 'Day', value: state.raw.rules.DayTime_s, inline: true },
            ).setTimestamp();
    
            msg.channel.send({ embeds: [onlineEmbed] });
          }).catch( error => {
            const offlineEmbed = new Discord.MessageEmbed()
            .setColor('#009900')
            .setTitle(`Lost Island server stats`)
            .setThumbnail('https://media.discordapp.net/attachments/719313280749011074/935141082537275423/unknown.png')
            .addField('Server status', 'Offline')
            .setTimestamp();

            msg.channel.send(offlineEmbed);
          });
       
        }
}
