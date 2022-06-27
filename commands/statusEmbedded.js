const Discord = require('discord.js');
const Gamedig = require('gamedig');

module.exports = {
    name: '!fjordur',
    description: 'emdbedded server stats',
    execute(msg, args, ipAddress, port) {
        Gamedig.query({
            type: 'arkse',
            host: ipAddress,
            port: port,
            maxAttempts: 2
          }).then( state => {
            let names = '';
            if (state.players.length > 0) {
              for (let i = 0; i < state.players.length; i++) {
              names += state.players[i].name;
              if (i < state.players.length - 1) {
                names += ", "
                }
              }
            } else {
              names += 'No players online';
            }
            const onlineEmbed = new Discord.MessageEmbed()
            .setColor('#009900')
            .setTitle(`${state.name}`)
            .setThumbnail('https://media.discordapp.net/attachments/719313280749011074/987159043380482048/unknown.png')
            .addFields(
                { name: 'Server status', value: 'Online' },
                { name: 'Players', value: `${state.players.length} of ${state.maxplayers}`},
                { name: 'Names', value: names},
                { name: 'Ping', value: `${state.ping} ms`},
                { name: 'Map', value: state.map},
                { name: 'IP', value: '67.219.138.178:27175' },
                //{ name: 'Day', value: state.raw.rules.DayTime_s, inline: true },
            ).setTimestamp();
    
            msg.channel.send({ embeds: [onlineEmbed] });
          }).catch( error => {
            const offlineEmbed = new Discord.MessageEmbed()
            .setColor('#009900')
            .setTitle(`Lost Island server stats`)
            .setThumbnail('https://media.discordapp.net/attachments/719313280749011074/987159043380482048/unknown.png')
            .addField('Server status', 'Offline')
            .setTimestamp();

            msg.channel.send(offlineEmbed);
          });
       
        }
}
