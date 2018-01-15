exports.run = async (client, msg, args) => {
    const { log } = console;
    const mention = msg.mentions.users.first();

    if (!msg.channel.permissionsFor(msg.author).has("MANAGE_GUILD")) {
        msg.channel.send(`${msg.author.username} you have failed this city!`);
        return;
    }
    const perms = [
          "KICK_MEMBERS",
          "BAN_MEMBERS",
          "ADMINISTRATOR",
          "MANAGE_CHANNELS",
          "MANAGE_GUILD",
          "MANAGE_MESSAGES",
          "READ_MESSAGE_HISTORY",
          "MENTION_EVERYONE",
          "MUTE_MEMBERS",
          "DEAFEN_MEMBERS",
          "MOVE_MEMBERS",
          "MANAGE_NICKNAMES",
          "MANAGE_ROLES",
          "MANAGE_WEBHOOKS",
          "MANAGE_EMOJIS",
      ];

    // if(args.length !== 2) {
    //     msg.channel.send('Invalid request');
    //     return;
    // }

    if(typeof mention === "undefined") {
        msg.channel.send("Usage: `perms @username`");
        return;
    }

    const permsFor = await msg.guild.fetchMember(mention.id);
    let hasPerms = [];

    for(var k = 0; k < perms.length; k++) {
        log(perms[k])
        if(msg.channel.permissionsFor(permsFor).has(perms[k])) {
            hasPerms.push(perms[k]);
        }
    }

    let returnStr = `${permsFor} has:\n`;
    for(var i = 0; i < hasPerms.length; i++) {
        returnStr += `${hasPerms[i]},\n`;
    }
    msg.channel.send(returnStr);
}
