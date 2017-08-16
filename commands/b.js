/**
  *
  * Bittrex price lookups. Returns BTC -> USD
  *
  *
  */



  exports.run = async (client, msg, args) => {
  	if(!(args.length == 2)) {
  		msg.channel.send("Bittrex lookup must only contain a base (BTC, ETH, USDT, BITCNY) and a coin symbol.");
  		msg.channel.send("If you just want the price of BTC in USD, type .b b btc");
  		return false;
  	}
  	const b = require('node.bittrex.api');
  	b.options({
  		'apikey' : client.config.bittrexKey,
  		'apisecret' : client.config.bittrexSecret, 
  	});

  	let base = args[0].toUpperCase();
  	let coin = args[1].toUpperCase();

  	const btcd = await client.sf.get('https://bittrex.com/Api/v2.0/pub/currencies/GetBTCPrice');
  	const usdRate = btcd.body.result.bpi.USD.rate_float;
  	const bases = ["USDT", "BTC", "ETH", "BITCNY"];
  	b.getticker( { market : base+'-'+coin }, function( data, err ) {
  		let ok = (data == null ? false : true);
  		if(base === "USDT") {
  			let usdtFixed = (data.result.Last).toFixed(2);
  			msg.channel.send(`Last trade for **${coin}** for USDT:\n\n\tUSDT: ${usdtFixed}`);
  			return false;
  		} else if(coin === "BTC" && base === "R") {
  			fixedRate = usdRate.toFixed(2);
  			msg.channel.send(`Price of BTC in USD: $${fixedRate}`);
  			return false;
  		} else if(!bases.indexOf(base)) {
  			msg.channel.send("Invalid base requested. Use ETH/BTC/USDT/BITCNY.");
  		} else if(!ok) {
  			msg.channel.send("Invalid ticker requested. Try again.").catch(console.error);
  			return false;
  		}
  		let priceInUSD = parseFloat(usdRate * data.result.Last).toFixed(2);
  		msg.channel.send(`Last trade for **${coin}**:\n\n\t${base}: ${data.result.Last}\n\tUSD: $${priceInUSD}`);
	});
  }