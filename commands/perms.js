exports.run = (client, msg, args) => {
    const {log} = console;
    const mention = msg.mentions.users.first();
log(mention.lastMessage.member.roles);
    if(args.length !== 1) {
        msg.channel.send('Invalid request');
        return;
    }

    if(typeof mention === "undefined") {
        msg.channel.send("Usage: `perms @username`");
        return;
    }

    log(mention.permissions);
}
