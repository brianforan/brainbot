/**
  *
  * Get Poloniex Prices
  *
  *
 */

exports.run = async(client, msg, args) => {
	if(args.length !== 2) {
		msg.channel.send("Please provide a base and a ticket! Ex: btc bcn");
		return false;
	} 


	let check = `${args[0]}_${args[1]}`;
	check = check.toUpperCase();
	const Poloniex = require('poloniex-api-node');
	let p = new Poloniex();

	p.returnTicker((err, ticker) => {
		  if (err) {
		    console.log(err.message);
		    return false;
		  } else if(!ticker.hasOwnProperty(check)) {
		  	msg.channel.send(`${check} was not found in the data! Try with a different combination.`); 
		  	return false;
		  }
		  // console.log(ticker[check]);
		  // msg.channel.send(JSON.stringify(ticker[check]));
		  let wd = ticker[check];
		  let percentChange = parseFloat(wd.percentChange * 100);
		  let text = `**${check}**:\n\n`
		  	 text += `--Last: ${wd.last}\n--Lowest Ask: ${wd.lowestAsk}\n--Highest Bid: ${wd.highestBid}\n--Percent Change: ${percentChange}%\n`;
		  	 text += `--Base Volume: ${wd.baseVolume}\n--Quote Volume: ${wd.quoteVolume}\n--24 Hr High: ${wd.high24hr}\n--24 Hr Low: ${wd.low24hr}`;
		  	 msg.channel.send(text);
		  
	});
}