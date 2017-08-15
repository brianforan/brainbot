/**
  *
  * Bittrex price lookups. Returns BTC -> USD
  *
  *
  */



  exports.run = (client, msg, args) => {
  	if(args.length > 1) {
  		msg.channel.send("Bittrex lookup must only contain one coin symbol.").catch(console.error);
  		return false;
  	}
  	const b = require('node.bittrex.api');
  	b.options({
  		'apikey' : client.config.bittrexKey,
  		'apisecret' : client.config.bittrexSecret, 
  	});

  	let coin = args[0].toUpperCase();

  	const btcd = await client.sf.get('https://bittrex.com/Api/v2.0/pub/currencies/GetBTCPrice');
  	console.log(btcd);
  	b.getticker( { market : 'BTC-'+coin }, function( data, err ) {
  		let ok = (data == null ? false : true);
  		if(!ok) {
  			msg.channel.send("Invalid ticker requested. Try again.").catch(console.error);
  			return false;
  		}

  		
              // msg.channel.send(
	             //  `Showing data from last trade for **${coin}**\n\n\tBTC: ${data.result.Last}`+
	             //  `\n\tUSD: $${parseFloat(r.body.result.bpi.USD.rate_float)).toFixed(2)}`)).catch(console.err);
  		// msg.channel.send(`Showing data from last trade for **${coin}**\n\tBTC: ${data.result.Last}`+
  		// 	`\n\tUSD: $${parseFloat(btcd.result.bpi.USD.rate_float).toFixed(2)}`).catch(console.error);
	});
  }