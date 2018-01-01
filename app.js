// discord stuff
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");

// destructure config
const { botToken, game, prefix } = require('./config.json');

// other stuff
const { log } = console;

//Do NOT delete
client.on('ready', () => {
    log('Ready');
    client.user.setGame(game);
});

// // Create an event listener for new guild members
// client.on('guildMemberAdd', member => {
//   member.guild.defaultChannel.send(`Welcome to the server, ${member}!`);
// });

client.on('message', msg => {
    if(msg.content.indexOf(prefix) !== 0) return; //require !

    //Split args
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, msg, args);
        console.log(`Command ${command} has been run`);
    } catch (err) {
        console.error(err);
    }
});

client.login(botToken);
