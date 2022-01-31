require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const botCommands = require('./commands');
const Gamedig = require('gamedig');


let ipAddress = '5.62.65.39';
let port = '21778';

Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

const TOKEN = process.env.token;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);

  setInterval(() => {
    Gamedig.query({
    type: 'arkse',
    host: ipAddress,
    port: port,
    maxAttempts: 5
  }).then( state => {
    bot.user.setActivity(`${state.players.length} of ${state.maxplayers}`);
  }).catch( error => {
    console.log(error);
    bot.user.setActivity('Offline');
  })}, 3000);
});


bot.on('message', msg => {
  const args = msg.content.split(/ +/);
  const command = args.shift().toLowerCase();
  console.info(`Called command: ${command}`);

  // if (`${command} ${args[0]}` === '!setup valguero') {
  //   ipAddress = args[1];
  //   port = args[2];
  //   let online = false;
  // }

  if (!bot.commands.has(command)) return;

  try {
    bot.commands.get(command).execute(msg, args, ipAddress, port);
  } catch (error) {
    console.error(error);
    msg.reply('there was an error trying to execute that command!');
  }
});

