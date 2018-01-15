exports.run = (client, msg, args) => {
    const str = args.toString();
    const ans = eval(`${str}`);
    msg.channel.send(`\`${str}\` = ${ans}`);
}
