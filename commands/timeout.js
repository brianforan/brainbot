exports.run = async (client, msg, args) => {
    const { log } = console;
    const mention = msg.mentions.users.first();

    if(args.length !== 2) {
        msg.channel.send('Invalid request');
        return;
    }

    if(typeof mention === "undefined") {
        msg.channel.send("Usage: `perms @username`");
        return;
    }

    const assigns = [
        'yes', 'assign', 'add'
    ];

    const removes = [
        'no', 'unassign', 'remove'
    ];

    const assignee = await msg.guild.fetchMember(mention.id);

    if(assigns.includes(args[1])) {
        assignee.addRole('396394151266091011');
        msg.channel.send(`\`${args[0]}\` has been moved to timeout.`);
        return;
    } else if(removes.includes(args[1])) {
        assignee.removeRole('396394151266091011');
        msg.channel.send(`\`${args[0]}\` has been removed from timeout.`);
        return;
    }
}
