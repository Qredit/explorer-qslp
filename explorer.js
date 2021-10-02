const http = require('http');
const https = require('https');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const request = require('request');
const session = require('express-session')
const csrf = require('csurf')
const flatten = require('flat')
const Big = require('big.js');
const { promisify } = require('util');
const sqlite3 = require('sqlite3');
const asyncv3 = require('async');

// Qredit Libs
const qreditjs = require("qreditjs");
const qreditApi = require("nodeQreditApi");
const qslpApi = require("nodeQslpApi");

const qapi = new qreditApi.default();
const qslpapi = new qslpApi.default();

var indexRouter = require('./routes/index');
const { paused } = require('browser-sync');

var serverPort = 5200;

var app = express();


var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(serverPort);


////
// Web Stuff

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	secret: 'justsomerandomness191919',
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 864000
	}
}));
app.use(csrf());

app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});



////
// Socket IO gettokenlist

io.on('connection', function (socket) {


	socket.on('gettokenlist', function (input) {

		var page = input.page;
		var limit = input.limit;

		(async () => {

			var data = await qslpapi.listTokens(100, 1);

			var flatJson = [];

			for (let i = 0; i < data.length; i++) {
				let tempJson = {
					version: data[i].type,
					name: data[i].tokenDetails.name,
					symbol: data[i].tokenDetails.symbol,
					owneraddress: data[i].tokenDetails.ownerAddress,
					tokenid: data[i].tokenDetails.tokenIdHex,
					circsupply: (data[i].tokenStats.qty_token_circulating_supply),
					pausable: data[i].tokenDetails.pausable == true ? '<img alt="ok" src="/img/ok-24.png">' : '<img alt="ok" src="/img/offline-24.png">',
					mintable: data[i].tokenDetails.mintable == true ? '<img alt="ok" src="/img/ok-24.png">' : '<img alt="ok" src="/img/offline-24.png">'
				};
				flatJson.push(tempJson);
			}

			socket.emit('qslptokenlist', flatJson);

		})();

	});



	// Socket IO getdelegates

	socket.on('getdelegates', function (input) {

		(async () => {

			var response = await qapi.listDelegates(1, 51);
			var data = response.data;

			var flatJson = [];
			for (let i = 0; i < data.length; i++) {
				let tempJson = {
					rank: data[i].rank,
					address: data[i].address,
					username: data[i].username,
					blocks: data[i].blocks.produced,
					timestamp: data[i].blocks.last.timestamp.human,
					approval: data[i].production.approval
				};
				flatJson.push(tempJson);
			}

			socket.emit('showdelegates', flatJson);

		})();

	});

	// Socket IO getblocks

	socket.on('getblocks', function (input) {

		(async () => {

			var response = await qapi.listBlocks(1, 50);
			var data = response.data;
			var flatJson = [];
			for (let i = 0; i < data.length; i++) {
				let tempJson = {

					id: data[i].id,
					height: data[i].height,
					timestamp: data[i].timestamp.human,
					rewardtotal: data[i].forged.total,
					transactionsforged: data[i].transactions,
					lastforgedusername: data[i].generator.username,
					address: data[i].generator.address,

				};
				flatJson.push(tempJson);
			}
			socket.emit('showblocks', flatJson);

		})();

	});

	// Socket IO getpeers

	socket.on('getpeers', function (input) {

		(async () => {

			var response = await qapi.getPeers();
			var data = response.data;

			var flatJson = [];
			for (let i = 0; i < data.length; i++) {
				let tempJson = {
					peerip: data[i].ip,
					p2pport: data[i].port,
					version: data[i].version,
					height: data[i].height,
					latency: data[i].latency
				};
				flatJson.push(tempJson);
			}

			socket.emit('showpeers', flatJson);
		})();

	});

	socket.on('search', function (input) {

		(async () => {
			var blockResults = await qapi.getBlockByID(input)
			var walletResults = await qapi.getWalletByID(input)
			var transactionsResult = await qapi.getTransactionByID(input)
			var delegateResult = await qapi.getDelegate(input)
			var tokensResult = await qslpapi.getToken(input);

			var blockParsed = null
			if (blockResults.data) {
				blockParsed = blockResults.data;

				if (blockResults.data.length > 1)
					blockParsed = blockResults.data[0]
			}

			var walletParsed = null
			if (walletResults.data)
				walletParsed = walletResults.data;

			var transactionParsed = null
			var tokenTransactions = null
			if (transactionsResult.data) {
				if (transactionsResult.data.vendorField.toString().includes('qslp1'))
					tokenTransactions = transactionsResult.data
				else
					transactionParsed = transactionsResult.data;
			}

			var delegateParsed = null
			if (delegateResult.data)
				delegateParsed = delegateResult.data;

			/*var tokensParsed = tokensResult.length > 0 ? tokensResult[0] : null*/

			var returnValue = {
				blocks: blockParsed,
				wallets: walletParsed,
				transactions: transactionParsed,
				tokenTransactions: tokenTransactions,
				delegates: delegateParsed,
				/*tokens: tokensParsed*/
			}

			socket.emit('showsearch', returnValue);
			console.log(returnValue)
		})();
	});

	// Socket IO gettransactions

	socket.on('gettransactions', function (input) {

		(async () => {

			var response = await qapi.listTransactions();
			var data = response.data;
			var flatJson = [];
			for (let i = 0; i < data.length; i++) {
				let tempJson = {
					id: data[i].id,
					confirmations: data[i].confirmations,
					timestamp: data[i].timestamp.human,
					sender: data[i].sender,
					recipient: data[i].recipient,
					smartbridge: data[i].vendorField,
					amount: data[i].amount,
				};
				flatJson.push(tempJson);
			}

			socket.emit('showtransactions', flatJson);

		})();

	});

	// Socket IO getwallet 

	socket.on('getwallet', function (input) {

		(async () => {

			response = await qapi.getWalletByID(input.walletId);


			var qslpdata = await qslpapi.getTokensByOwner(input.walletId);
			console.log(qslpdata)
			/*		if (qslpdata) {
						response.data.qslp = qslpdata[0];
					} */

			var data = flatten(response.data);
			var tempJson = {
				address: data.address,
				publickey: data.publicKey,
				nonce: data.nonce,
				balance: data.balance,
				username: data.username
			};
			console.log(tempJson)
			socket.emit('showwallet', tempJson);

		})();

	});



	socket.on('gettopwallets', function (input) {

		(async () => {

			var response = await qapi.getTopWallets();
			var data = response.data;

			var flatJson = [];
			for (let i = 0; i < data.length; i++) {
				let tempJson = {
					rank: data[i].rank,
					isdelegate: data[i].isDelegate == true ? '<i class="nav-icon i-Yes font-weight-bold" style="color:green;"></i>' : '<i class="nav-icon i-Close-Window font-weight-bold" style="color:red;"></i>',
					address: data[i].address,
					balance: data[i].balance
				};
				flatJson.push(tempJson);
			}

			socket.emit('showtopwallets', flatJson);

		})();

	});
	// Socket IO getwallettransactions

	socket.on('getwallettransactions', function (input) {

		(async () => {

			response = await qapi.getWalletTransactions(input.walletId);
			var data = (response.data);
			var flatJson = [];
			for (let i = 0; i < data.length; i++) {
				let tempJson = {
					id: data[i].id,
					timestamp: data[i].timestamp.human,
					sender: data[i].sender,
					recipient: data[i].recipient,
					amount: data[i].amount,
					smartbridge: data[i].vendorField,
					confirmations: data[i].confirmations,
				};
				flatJson.push(tempJson);
			}

			socket.emit('showwallettransactions', flatJson);
		})();

	});


	// Socket IO gettransactiondetails

	socket.on('gettransactiondetails', function (input) {

		(async () => {

			response = await qapi.getTransactionByID(input.transactionId);

			var qslpdata = await qslpapi.getTransaction(input.transactionId);

			if (qslpdata) {
				response.data.qslp = qslpdata[0];
			}
			console.log(qslpdata)
			var data = (response.data);
			console.log(response.data)
			var flatJson = {
				txid: data.id,
				blockid: data.blockId,
				id: data.id,
				amount: data.amount,
				fee: data.fee,
				sender: data.sender,
				publickey: data.senderPublicKey,
				recipient: data.recipient,
				smartbridge: data.vendorField,
				confirmations: data.confirmations,
				timestamp: data.timestamp.human,
				nonce: data.nonce,
				signature: data.signature,

				/* summary section */
				/*
								amountsummary: data.amount,
								blockheight: data['qslp.blockHeight'],
								qslptransaction: data['qslp.valid'] == true ? '<i class="nav-icon i-Yes font-weight-bold"style="color:green;"></i>' : '<i class="nav-icon i-Close-Window font-weight-bold" style="color:red;"></i>',
								'QSLP Invalid Reason': data['qslp.invalidReason'],
								'QSLP Transaction Type': data['qslp.transactionDetails.transactionType'],
								'QSLP Token ID': data['qslp.transactionDetails.tokenIdHex'],
								'QSLP Token Symbol': data['qslp.transactionDetails.symbol'],
								'QSLP Token Name': data['qslp.transactionDetails.name'],
								'QSLP Document URL': data['qslp.transactionDetails.documentUri'],
								'QSLP Decimals': data['qslp.transactionDetails.decimals'],*/
				/*'QSLP Amount': Big(data['qslp.transactionDetails.sendOutput.amount']).div(Big(10).pow(data['qslp.transactionDetails.decimals'])).toFixed(data['qslp.transactionDetails.decimals'])*/
			};


			socket.emit('showtransactiondetails', flatJson);
			console.log(flatJson)
		})();

	});



	// Socket IO gettokeninfo

	socket.on('gettokeninfo', function (input) {

		(async () => {

			var data = await qslpapi.getToken(input.tokenid);
			var data = (data);
			var tempJson = {

				/* first */
				type: data.type,
				paused: data.paused,
				lastupdatedblock: data.lastUpdatedBlock,

				/* nested under tokenDetails */
				owneraddress: data.tokenDetails.ownerAddress,
				tokenidhex: data.tokenDetails.tokenIdHex,
				timestamp: data.tokenDetails.genesis_timestamp,
				qslpversion: data.tokenDetails.versionType,
				symbol: data.tokenDetails.symbol,
				name: data.tokenDetails.name,
				documenturi: data.tokenDetails.documentUri,
				decimals: data.tokenDetails.decimals,
				genesisquantity: data.tokenDetails.genesisQuantity,
				pausable: data.tokenDetails.pausable,
				mintable: data.tokenDetails.mintable,

				/* nested under tokenStats */
				blockcreatedheight: data.tokenStats.block_created_height,
				blockcreatedid: data.tokenStats.block_created_id,
				blocklastactivesend: data.tokenStats.block_last_active_send,
				blocklastactivemint: data.tokenStats.block_last_active_mint,
				creationtxid: data.tokenStats.creation_transaction_id,
				qtyvalidtxnssincegenesis: data.tokenStats.qty_valid_txns_since_genesis,
				qtyvalidtokenaddresses: data.tokenStats.qty_valid_token_addresses,
				qtytokenminted: data.tokenStats.qty_token_minted,
				qtytokenburned: data.tokenStats.qty_token_burned,
				qtytokencirculatingsupply: data.tokenStats.qty_token_circulating_supply,
				qtyxqrspent: data.tokenStats.qty_xqr_spent,

			};

			socket.emit('showtokeninfo', tempJson);
			console.log(tempJson)
		})();

	});
	// Socket IO gettokeninfo

	socket.on('gettokenmeta', function (input) {

		(async () => {
			var data = await qslpapi.getTokenWithMeta(input.tokenid);
			var flatJson = [];
			var data = (data.metadata)
			for (let i = 0; i < data.length; i++) {
				let tempJson = {
					metatxid: data[i].txid,
					metablockid: data[i].blockId,
					metablockheight: data[i].blockHeight,
					posteraddress: data[i].metaDetails.posterAddress,
					timestamp: data[i].metaDetails.timestamp,
					metaname: data[i].metaDetails.metaName,
					metachunk: data[i].metaDetails.metaChunk,
					metadata: data[i].metaDetails.metaData,
					void: data[i].void,
				};
				flatJson.push(tempJson);
			}
			socket.emit('showtokenmeta', flatJson);
			console.log(flatJson)
		})();

	});

	// Socket IO gettopwallets

	socket.on('gettopwallets', function (input) {

		(async () => {

			var response = await qapi.getTopWallets();
			var data = response.data;

			var flatJson = [];
			for (let i = 0; i < data.length; i++) {
				let tempJson = {
					rank: data[i].rank,
					isdelegate: data[i].isDelegate == true ? '<i class="nav-icon i-Yes font-weight-bold" style="color:green;"></i>' : '<i class="nav-icon i-Close-Window font-weight-bold" style="color:red;"></i>',
					address: data[i].address,
					balance: data[i].balance
				};
				flatJson.push(tempJson);
			}

			socket.emit('showtopwallets', flatJson);

		})();

	});


	// Socket IO getapifields
	socket.on('getapifields', function (input) {

		var apiurl = input.apiurl;

		request.get({
			url: apiurl
		}, function (err, response, body) {

			if (!err) {

				var jsonbody = JSON.parse(body);

				var flatjson = flatten(jsonbody);

				var keys = Object.keys(flatjson);

				socket.emit('parsedApiFields', keys);

			}

		});

	});

	socket.on('getapidata', function (input) {

		var apiurl = input.apiurl;
		var datamapjson = JSON.parse(input.datamapjson);

		request.get({
			url: apiurl
		}, function (err, response, body) {

			if (!err) {

				var jsonbody = JSON.parse(body);

				var flatjson = flatten(jsonbody);

				var keys = Object.keys(flatjson);

				var newjson = {};

				keys.forEach(function (key) {

					if (datamapjson[key] && datamapjson[key] != null) {

						newjson[datamapjson[key]] = flatjson[key];

					}

				});

				socket.emit('parsedApiData', {
					'QDS': newjson
				});

			}

		});

	});

});


