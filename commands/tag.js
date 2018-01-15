exports.run = async (client, msg, args) => {
    const { knex } = client;
    const { log } = console;

    const help = ['-h', '-help', 'help'];

    let doesItExist;
    if(!help.includes(args[0])) {
        const tagname = args[0].indexOf('-') !== 0
                        ? args[0]
                        : args[1];

        // Options: -a (add) | -h (help) | -d (delete) | -u (update)

        // Checks if exists: add, view, delete, update
        doesItExist = await knex('tags').where({ 'tagname': tagname, 'guild_id': msg.channel.guild.id })
        if(doesItExist.length === 0 && args[0] !== '-a') {
            msg.channel.send(`Tag ${tagname} does not exist.`);
            return;
        }
    }

    switch(args[0]) {
        case '-h':
        case '-help':
        case 'help':
            msg.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        name: msg.author.username,
                        icon_url: msg.author.avatarURL
                    },
                    fields: [{
                        name: 'Tag Utility',
                        value: `~tag [-a | -h | -d | -u] <name> <description>`
                    }]
                }
            })
            break;
        case '-d':
            if (!msg.channel.permissionsFor(msg.author).has("MANAGE_MESSAGES")) {
                msg.channel.send(`${msg.author.username} you have failed this city!`);
                return;
            } else if (!msg.channel.permissionsFor(client.user).has("MANAGE_MESSAGES")) {
                msg.channel.send('I cannot do this!')
                return;
            }

            const removed = await knex('tags').where('id', doesItExist[0].id).del();

            msg.channel.send(`Tag \`${args[1]}\` has been removed.`);
            break;
        case '-a':
            if(args.length < 3) {
                msg.channel.send('You must specify a tag description! Use `help tag` for more info');
                return;
            } else if (args[1].length > 25) {
                msg.channel.send('Tag name must be <25 characters.');
                return;
            }

            // Get tag data ready for insertion
            const tagname = args[1];
            args.shift();
            args.shift();
            const desc = args.join(' ');

            if(doesItExist.length === 0) {
                const didItGo = await knex.insert({
                    tagname: tagname,
                    description: desc,
                    created_by: msg.author.id,
                    guild_id: msg.channel.guild.id
                }).into('tags');

                if(typeof didItGo[0] === 'number' && didItGo.length === 1) {
                    msg.channel.send(`Tag appears to have been added. Check it with \`tag ${tagname}\``);
                }
            } else {
                msg.channel.send(`Tag ${tagname} already exists!`);
            }
            break;
        case '-u':
            // update code
            break;
        default:
            if(args.length > 1) {
                msg.channel.send(`Tag names cannot have spaces in them. Showing tag info for ${tagname}`);
            }

            const description = doesItExist[0].description;
            msg.channel.send(description);
            return;
    }
}
