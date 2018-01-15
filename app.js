// bot stuff
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");

// destructures for app
const { botToken, game, prefix, db} = require('./config.json');
const { log } = console;

const SELF = true;

client.on('ready', () => {
    log('Ready');
    client.user.setGame(game);

});

client.on('message', msg => {
    if(msg.content.toLowerCase() === 'good bot') {
        msg.channel.send(':drooling_face:');
        return;
    }

    if(msg.content.indexOf(prefix) !== 0) return; //require !

    //Split args
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const dbCommands = ['tag'];

    try {
        if(dbCommands.includes(command)) {
            client.knex = require('knex')({
                client: 'mysql2',
                connection: {
                    host: db.server,
                    user: db.user,
                    password: db.pass,
                    database: db.name,
                    port: db.port
                }
            });
        }
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, msg, args);
        console.log(`Command ${command} has been run`);
    } catch (err) {
        console.error(err);
    }
});

client.login(botToken);
