// bot stuff
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

// Read commands
const directory = './commands'
const commands = {}
fs.readdirSync (directory)
  .filter (x => !fs.lstatSync (`${directory}/${x}`).isDirectory ())
  .forEach(x => commands[x.split('.')[0]] = require (`${directory}/${x}`))


// destructures for app
const { botToken, game, prefix, db} = require('./config.json');
const { log } = console;

client.on('ready', () => {
    client.user.setGame(game);
});

client.on('message', msg => {
    if(msg.content.toLowerCase() === 'hello') {
        msg.channel.send('hello :D');
        return;
    }

    if(msg.content.indexOf(prefix) !== 0) return; //require prefix

    //Split args
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        commands[command].run(client, msg, args);
        console.log(`Command ${command} has been run`);
    } catch (err) {
        console.error(err);
    }
});

client.login(botToken);
