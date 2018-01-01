exports.run = (client, msg, args) => {
    const { log } = console;

    // Define some conversions
    const conversions = {
        'stone-lbs': '* 14',
        'lbs-stone': '/ 14',
        'c-f': '* 1.8 + 32',
    }

    // Usage: <number> <what it is> <what to convert to>

    if(args.length !== 3) {
        msg.channel.send('Invalid args. Use `prune help` for info');
    }

    const base = args[0];
    const from = args[1];
    const to = args[2];

    const $key = `${from}-${to}`;

    let $return;
    let maths;

    if(conversions.hasOwnProperty($key)) {
        maths = conversions[$key];
        log(`${base} ${maths}`)
        $return = parseFloat(eval(`${base} ${maths}`)).toFixed(2);
    } else if($key === 'f-c') {
        maths = '- 32 * .5556';
        $return = parseFloat(eval(`(${base} - 32) * .5556 `));
    }

    msg.channel.send({
        embed: {
            color: 3447003,
            author: {
                name: msg.author.username,
                icon_url: msg.author.avatarURL
            },
            fields: [{
                name: 'Conversion',
                value: `${base} ${maths} = ${$return} ${to}`
            }]
        }
    });
}
