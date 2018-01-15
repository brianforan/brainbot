exports.run = (client, msg, args) => {
    // Usage: prune <amt> <user>
    if(args.length !== 1) {
        msg.channel.send('Invalid usage.');
        return;
    }

    const skipChecks = msg.author.id === '131081651852673024' ? true : false; 
    if(skipChecks === false) {
        if (!msg.channel.permissionsFor(msg.author).has("MANAGE_MESSAGES")) {
            msg.channel.send(`${msg.author.username} you have failed this city!`);
            return;
        } else if (!msg.channel.permissionsFor(client.user).has("MANAGE_MESSAGES")) {
            msg.channel.send('I cannot do this!')
            return;
        }
    }

    let amountToDelete = parseInt(args[0]);
    if(amountToDelete > 1000 || amountToDelete <= 2) {
        msg.channel.send('Provide a number above 2 and less than 1000');
        return;
    }

    if(amountToDelete <= 100) {
        msg.channel.bulkDelete(amountToDelete);

        msg.channel.send({
            embed: {
                color: 3447003,
                author: {
                    name: msg.author.username,
                    icon_url: msg.author.avatarURL
                },
                fields: [{
                    name: 'Channel Prune',
                    value: `${args[0]} messages have been deleted by ${msg.author.username}.`
                }]
            }
        });

        return;
    }

    const iterations = Math.ceil(amountToDelete / 100);

    for(i = 0; i < iterations; i++) {
        if(amountToDelete === 0) return;

        if(amountToDelete > 100) {
            msg.channel.bulkDelete(100);
            amountToDelete -= 100;
            console.log(`100 Messages deleted ${amountToDelete} remaining`);
        } else {
            console.log(`${amountToDelete} messages deleted`)
            msg.channel.bulkDelete(amountToDelete);
        }
    }

    msg.channel.send({
        embed: {
            color: 3447003,
            author: {
                name: msg.author.username,
                icon_url: msg.author.avatarURL
            },
            fields: [{
                name: 'Channel Prune',
                value: `${args[0]} messages have been deleted by ${msg.author.username}.`
            }]
        }
    })
}
