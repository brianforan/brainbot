/*
 *
 * Simple ping->pong! example
 * 
*/

exports.run = (client, msg, args) => {
	msg.channel.send("pong!").catch(console.error);
};