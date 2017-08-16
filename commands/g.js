/**
  *
  * GDAX price lookups. Returns BTC -> USD
  *
  *
  */

exports.run = async (client, msg, args) => {
	const gdax = require('gdax');
	const g = new gdax.PublicClient();

	console.log(response);
}