/**
  *  Brain Bot
  *  Uses discord.js
  *  
  *  Start date 8/14/2017
  *
*/



const Discord = require('discord.js');
const client = new Discord.Client();
client.config = require('./config.json');
client.sf = require("snekfetch");
const fs = require("fs");
client.commands = new Discord.Collection();

if(process.version.slice(1).split(".")[0] < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system. If you ask me 'why doesn't your selfbot work' and I see this error I will slap you silly.");


//Do NOT delete
client.on('ready', () => {
  console.log('I am ready!');
});

// // Create an event listener for new guild members
// client.on('guildMemberAdd', member => {
//   member.guild.defaultChannel.send(`Welcome to the server, ${member}!`);
// });

client.on('message', msg => {
  if(msg.content.indexOf(client.config.prefix) !== 0) return; //require !

  //Split args
  const args = msg.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, msg, args);
    console.log(`Command ${command} has been run`);
  } catch (err) {
    msg.channel.send("An error was caught! Bad command? .ping - very useful");
    console.error(err);
  }
});
// Log our bot in
client.login(client.config.botToken);