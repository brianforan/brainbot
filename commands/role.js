exports.run = async (client, msg, args) => {
    const { log } = console;

    if(args.length !== 1) {
        msg.channel.send('usage: `!!role <roleName>` - one word roles only, case sensitive')
        return;
    }

    const allowedRoles = ['ZEN'];
    if(!allowedRoles.includes(args[0])) {
        msg.channel.send('can\'t join that role');
        return;
    }

    const assignee = await msg.guild.fetchMember(msg.author.id);
    const role = await msg.guild.roles.find('name', `${args[0]}`);
    let role_id;
    if(typeof role === 'object') {
        role_id = role.id;
    } else {
        log('role does not exist');
        return;
    }


    if(!assignee.roles.has(`${role_id}`)) {
        assignee.addRole(`${role_id}`);
        return;
    } else if(assignee.roles.has(`${role_id}`)) {
        assignee.removeRole(`${role_id}`);
        return;
    }

}
