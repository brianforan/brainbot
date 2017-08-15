/**
  *  Brain Bot
  *  Uses discord.js
  *  
  *  Start date 8/14/2017
  *
*/



const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const token = config.botToken;
const fs = require("fs");
client.commands = new Discord.Collection();

if(process.version.slice(1).split(".")[0] < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system. If you ask me 'why doesn't your selfbot work' and I see this error I will slap you silly.");

//taken from
//https://github.com/eslachance/evie.selfbot/blob/master/app.js
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  console.log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    if(f.split(".").slice(-1)[0] !== "js") return;
    let props = require(`./commands/${f}`);
    client.commands.set(props.help.name, props);
    if(props.init) props.init(client);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});



//Do NOT delete
client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  member.guild.defaultChannel.send(`Welcome to the server, ${member}!`);
});

client.on('message', message => {
  if(message.content === "Hello") {
    client.message("World");
  }

  if(message.content === "!ping") {
    message.reply("Pong!");
  }
});

// Log our bot in
client.login(token);