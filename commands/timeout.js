exports.run = async (client, msg, args) => {
    const { log } = console;
    const mention = msg.mentions.users.first();
    const sender = await msg.guild.fetchMember(msg.author.id);

    if(!sender.roles.has('396086937951272961') && !msg.channel.permissionsFor(msg.author).has("MANAGE_ROLES")) {
        msg.delete();
        msg.channel.send('Insufficient privileges.');
        return;
    }

    if(typeof mention === "undefined") {
        msg.delete();
        msg.channel.send("Usage: `timeout @username`");
        return;
    }
    //
    // const assigns = [
    //     'yes', 'assign', 'add'
    // ];
    //
    // const removes = [
    //     'no', 'unassign', 'remove'
    // ];

    const assignee = await msg.guild.fetchMember(mention.id);

    if(!assignee.roles.has('396394151266091011')) {
        assignee.addRole('396394151266091011');
        msg.channel.send(`\`${assignee.user.username}\` has been moved to timeout.`);
        return;
    } else if(assignee.roles.has('396394151266091011')) {
        assignee.removeRole('396394151266091011');
        msg.channel.send(`\`${assignee.user.username}\` has been removed from timeout.`);
        return;
    }
}
