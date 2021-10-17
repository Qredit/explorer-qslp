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

// libs

var motionsdk = require("motion-sdk");
const qreditApi = motionsdk.qreditApi;
const blockpoolApi = motionsdk.blockpoolApi;
const arkApi = motionsdk.arkApi;
const darkApi = motionsdk.darkApi;
const personaApi = motionsdk.personaApi;
const qslpApi = motionsdk.qslpApi;

const qapi = new qreditApi.default();
const qslpapi = new qslpApi.default();
const papi = new personaApi.default();
const aapi = new arkApi.default();
const daapi = new darkApi.default();
const bapi = new blockpoolApi.default();

const qreditjs = require("qreditjs");


var indexRouter = require('./routes/index');
// const { paused } = require('browser-sync');

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

io.on('connection', function (socket) {

	/************************************************************************
	  ___ ___   _   ___  ___ _  _   ___ _   _ _  _  ___ _____ ___ ___  _  _
	 / __| __| /_\ | _ \/ __| || | | __| | | | \| |/ __|_   _|_ _/ _ \| \| |
	 \__ \ _| / _ \|   / (__| __ | | _|| |_| | .` | (__  | |  | | (_) | .` |
	 |___/___/_/ \_\_|_\\___|_||_| |_|  \___/|_|\_|\___| |_| |___\___/|_|\_|

	 ************************************************************************/


	/* qredit */
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

		})();
	});

	/* ark */
	socket.on('arksearch', function (input) {

		(async () => {
			var blockResults = await bapi.getBlockByID(input)
			var walletResults = await bapi.getWalletByID(input)
			var transactionsResult = await bapi.getTransactionByID(input)
			var delegateResult = await bapi.getDelegate(input)

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

			var returnValue = {
				blocks: blockParsed,
				wallets: walletParsed,
				transactions: transactionParsed,
				delegates: delegateParsed,
			}

			socket.emit('arkshowsearch', returnValue);

		})();
	});

	/* ark devnet*/
	socket.on('darksearch', function (input) {

		(async () => {
			var blockResults = await bapi.getBlockByID(input)
			var walletResults = await bapi.getWalletByID(input)
			var transactionsResult = await bapi.getTransactionByID(input)
			var delegateResult = await bapi.getDelegate(input)

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

			var returnValue = {
				blocks: blockParsed,
				wallets: walletParsed,
				transactions: transactionParsed,
				delegates: delegateParsed,
			}

			socket.emit('darkshowsearch', returnValue);

		})();
	});

	/* blockpool */
	socket.on('blockpoolsearch', function (input) {

		(async () => {
			var blockResults = await bapi.getBlockByID(input)
			var walletResults = await bapi.getWalletByID(input)
			var transactionsResult = await bapi.getTransactionByID(input)
			var delegateResult = await bapi.getDelegate(input)

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

			var returnValue = {
				blocks: blockParsed,
				wallets: walletParsed,
				transactions: transactionParsed,
				delegates: delegateParsed,
			}

			socket.emit('blockpoolshowsearch', returnValue);

		})();
	});

	/*********************************************************************

		qredit

	 ********************************************************************/

	/*

	1. getdelegates  // done
	2. getlastblock  // done
	3. getblocks  // done
	4. getpeers  // done
	5. gettransactions  // done
	6. getwallet  // done
	7. gettopwallets  // done
	8. getwallettransactions  // done
	9. gettransactiondetails  // done
	10. getdelegatebyid  // done
	11. getnodeconfig  // done

	*/

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

	socket.on('getlastblock', function (input) {

		(async () => {

			var response = await qapi.getLastBlock();
			var data = (response.data);
			var flatJson = {
				getlastblockheight: data.height,
				getlastforgedusername: data.generator.username
			};

			socket.emit('showlastblock', flatJson);

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

			var data = (response.data);
			var flatJson = {
				address: data.address,
				publickey: data.publicKey,
				balance: (parseFloat(data.balance) / 100000000).toFixed(8),
				isdelegate: data.isDelegate == true ? '<span class="badge badge-success">Yes</span>' : '<span class="badge badge-danger">No</span>'
			};

			socket.emit('showwallet', flatJson);

		})();

	});

	/* gettopwallets */

	socket.on('gettopwallets', function (input) {

		(async () => {

			var response = await qapi.getTopWallets();
			var data = response.data;
			var flatJson = [];
			for (let i = 0; i < data.length; i++) {
				let tempJson = {
					rank: data[i].rank,
					isdelegate: data[i].isDelegate == true ? '<span class="badge badge-success">Yes</span>' : '<span class="badge badge-danger">No</span>',
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
			var data = (response.data);
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
			};

			socket.emit('showtransactiondetails', flatJson);
		})();

	});

	// Socket IO getdelegatebyid 

	socket.on('getdelegatebyid', function (input) {

		(async () => {

			response = await qapi.getDelegate(input.walletId);

			var data = (response.data);

			var flatJson = {
				username: data.username == null ? '<span>Not a delegate</span>' : data.username,
				votes: (parseFloat(data.votes) / 100000000).toFixed(0) + ' XQR',
				rank: data.rank,
				blocksproduced: data.blocks.produced,
				lastproducedblock: data.blocks.last.id,
				approval: data.production.approval + '%',
				isresigned: data.isResigned == true ? '<span class="badge badge-success">Yes</span>' : '<span class="badge badge-danger">No</span>'
			};
			socket.emit('showdelegatebyid', flatJson);

		})();

	});

	// Socket IO getnodeconfig

	socket.on('getnodeconfig', function (input) {

		(async () => {

			var response = await qapi.getNodeConfig();

			var data = (response.data);
			var flatJson = {

			};

			socket.emit('shownodeconfig', flatJson);

		})();

	});

	/*********************************************************************

	ark mainnet

 ********************************************************************/

	/*

	1. getdelegates  // done
	2. getlastblock  // done
	3. getblocks  // done
	4. getpeers  // done
	5. gettransactions  // done
	6. getwallet  // done
	7. gettopwallets  // done
	8. getwallettransactions  // done
	9. gettransactiondetails  // done
	10. getdelegatebyid  // done
	11. getnodeconfig  // done

	*/

	// Socket IO getdelegates

	socket.on('arkgetdelegates', function (input) {

		(async () => {

			var response = await aapi.listDelegates(1, 51);
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

			socket.emit('arkshowdelegates', flatJson);

		})();

	});

	// Socket IO getblocks

	socket.on('arkgetlastblock', function (input) {

		(async () => {

			var response = await aapi.getLastBlock();
			var data = (response.data);
			var flatJson = {
				getlastblockheight: data.height,
				getlastforgedusername: data.generator.username
			};

			socket.emit('arkshowlastblock', flatJson);

		})();

	});

	// Socket IO getblocks

	socket.on('arkgetblocks', function (input) {

		(async () => {

			var response = await aapi.listBlocks(1, 50);
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
			socket.emit('arkshowblocks', flatJson);
		})();

	});

	// Socket IO getpeers

	socket.on('arkgetpeers', function (input) {

		(async () => {

			var response = await aapi.getPeers();
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

			socket.emit('arkshowpeers', flatJson);
		})();

	});

	// Socket IO gettransactions
	socket.on('arkgettransactions', function (input) {

		(async () => {

			var response = await aapi.listTransactions();
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

			socket.emit('arkshowtransactions', flatJson);

		})();

	});

	// Socket IO getwallet 

	socket.on('arkgetwallet', function (input) {

		(async () => {

			response = await aapi.getWalletByID(input.walletId);

			var data = (response.data);
			var flatJson = {
				address: data.address,
				publickey: data.publicKey,
				balance: (parseFloat(data.balance) / 100000000).toFixed(8),
				isdelegate: data.isDelegate == true ? '<span class="badge badge-success">Yes</span>' : '<span class="badge badge-danger">No</span>'
			};

			socket.emit('arkshowwallet', flatJson);

		})();

	});

	/* gettopwallets */

	socket.on('arkgettopwallets', function (input) {

		(async () => {

			var response = await aapi.getTopWallets();
			var data = response.data;
			var flatJson = [];
			for (let i = 0; i < data.length; i++) {
				let tempJson = {
					rank: data[i].rank,
					isdelegate: data[i].isDelegate == true ? '<span class="badge badge-success">Yes</span>' : '<span class="badge badge-danger">No</span>',
					address: data[i].address,
					balance: data[i].balance
				};
				flatJson.push(tempJson);
			}

			socket.emit('arkshowtopwallets', flatJson);

		})();

	});
	// Socket IO getwallettransactions

	socket.on('arkgetwallettransactions', function (input) {

		(async () => {

			response = await aapi.getWalletTransactions(input.walletId);
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

			socket.emit('arkshowwallettransactions', flatJson);
		})();

	});


	// Socket IO gettransactiondetails

	socket.on('arkgettransactiondetails', function (input) {

		(async () => {

			response = await aapi.getTransactionByID(input.transactionId);

			/*	var qslpdata = await qslpapi.getTransaction(input.transactionId);
	
				if (qslpdata) {
					response.data.qslp = qslpdata[0];
				}*/
			var data = (response.data);
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
			};

			socket.emit('arkshowtransactiondetails', flatJson);
		})();

	});

	// Socket IO getdelegatebyid 

	socket.on('arkgetdelegatebyid', function (input) {

		(async () => {

			response = await aapi.getDelegate(input.walletId);

			var data = (response.data);

			var flatJson = {
				username: data.username == null ? '<span>Not a delegate</span>' : data.username,
				votes: (parseFloat(data.votes) / 100000000).toFixed(0) + ' ARK',
				rank: data.rank,
				blocksproduced: data.blocks.produced,
				lastproducedblock: data.blocks.last.id,
				approval: data.production.approval + '%',
				isresigned: data.isResigned == true ? '<span class="badge badge-success">Yes</span>' : '<span class="badge badge-danger">No</span>'
			};
			socket.emit('arkshowdelegatebyid', flatJson);

		})();

	});

	// Socket IO getnodeconfig

	socket.on('arkgetnodeconfig', function (input) {

		(async () => {

			var response = await aapi.getNodeConfig();

			var data = (response.data);
			var flatJson = {

			};

			socket.emit('arkshownodeconfig', flatJson);

		})();

	});

	/*********************************************************************

	ark devnet

 ********************************************************************/

	/*

	1. getdelegates  // done
	2. getlastblock  // done
	3. getblocks  // done
	4. getpeers  // done
	5. gettransactions  // done
	6. getwallet  // done
	7. gettopwallets  // done
	8. getwallettransactions  // done
	9. gettransactiondetails  // done
	10. getdelegatebyid  // done
	11. getnodeconfig  // done

	*/

	// Socket IO getdelegates

	socket.on('darkgetdelegates', function (input) {

		(async () => {

			var response = await daapi.listDelegates(1, 51);
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

			socket.emit('darkshowdelegates', flatJson);

		})();

	});

	// Socket IO getblocks

	socket.on('darkgetlastblock', function (input) {

		(async () => {

			var response = await daapi.getLastBlock();
			var data = (response.data);
			var flatJson = {
				getlastblockheight: data.height,
				getlastforgedusername: data.generator.username
			};

			socket.emit('darkshowlastblock', flatJson);

		})();

	});

	// Socket IO getblocks

	socket.on('darkgetblocks', function (input) {

		(async () => {

			var response = await daapi.listBlocks(1, 50);
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
			socket.emit('darkshowblocks', flatJson);
		})();

	});

	// Socket IO getpeers

	socket.on('darkgetpeers', function (input) {

		(async () => {

			var response = await daapi.getPeers();
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

			socket.emit('darkshowpeers', flatJson);
		})();

	});

	// Socket IO gettransactions
	socket.on('darkgettransactions', function (input) {

		(async () => {

			var response = await daapi.listTransactions();
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

			socket.emit('darkshowtransactions', flatJson);

		})();

	});

	// Socket IO getwallet 

	socket.on('darkgetwallet', function (input) {

		(async () => {

			response = await daapi.getWalletByID(input.walletId);

			var data = (response.data);
			var flatJson = {
				address: data.address,
				publickey: data.publicKey,
				balance: (parseFloat(data.balance) / 100000000).toFixed(8),
				isdelegate: data.isDelegate == true ? '<span class="badge badge-success">Yes</span>' : '<span class="badge badge-danger">No</span>'
			};

			socket.emit('darkshowwallet', flatJson);

		})();

	});

	/* gettopwallets */

	socket.on('darkgettopwallets', function (input) {

		(async () => {

			var response = await daapi.getTopWallets();
			var data = response.data;
			var flatJson = [];
			for (let i = 0; i < data.length; i++) {
				let tempJson = {
					rank: data[i].rank,
					isdelegate: data[i].isDelegate == true ? '<span class="badge badge-success">Yes</span>' : '<span class="badge badge-danger">No</span>',
					address: data[i].address,
					balance: data[i].balance
				};
				flatJson.push(tempJson);
			}

			socket.emit('darkshowtopwallets', flatJson);

		})();

	});
	// Socket IO getwallettransactions

	socket.on('darkgetwallettransactions', function (input) {

		(async () => {

			response = await daapi.getWalletTransactions(input.walletId);
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

			socket.emit('darkshowwallettransactions', flatJson);
		})();

	});


	// Socket IO gettransactiondetails

	socket.on('darkgettransactiondetails', function (input) {

		(async () => {

			response = await daapi.getTransactionByID(input.transactionId);

			/*	var qslpdata = await qslpapi.getTransaction(input.transactionId);
	
				if (qslpdata) {
					response.data.qslp = qslpdata[0];
				}*/
			var data = (response.data);
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
			};

			socket.emit('darkshowtransactiondetails', flatJson);
		})();

	});

	// Socket IO getdelegatebyid 

	socket.on('darkgetdelegatebyid', function (input) {

		(async () => {

			response = await daapi.getDelegate(input.walletId);

			var data = (response.data);

			var flatJson = {
				username: data.username == null ? '<span>Not a delegate</span>' : data.username,
				votes: (parseFloat(data.votes) / 100000000).toFixed(0) + ' DARK',
				rank: data.rank,
				blocksproduced: data.blocks.produced,
				lastproducedblock: data.blocks.last.id,
				approval: data.production.approval + '%',
				isresigned: data.isResigned == true ? '<span class="badge badge-success">Yes</span>' : '<span class="badge badge-danger">No</span>'
			};
			socket.emit('darkshowdelegatebyid', flatJson);

		})();

	});

	// Socket IO getnodeconfig

	socket.on('darkgetnodeconfig', function (input) {

		(async () => {

			var response = await daapi.getNodeConfig();

			var data = (response.data);
			var flatJson = {

			};

			socket.emit('darkshownodeconfig', flatJson);

		})();

	});

	/*********************************************************************

		BLOCKPOOL

	*********************************************************************/

	/*

	1. getdelegates  // done
	2. getlastblock  // done
	3. getblocks  // done
	4. getpeers  // done
	5. gettransactions  // done
	6. getwallet  // done
	7. gettopwallets  // done
	8. getwallettransactions  // done
	9. gettransactiondetails  // done
	10. getdelegatebyid  // done
	11. getnodeconfig  // done

	*/

	// Socket IO getdelegates

	socket.on('blockpoolgetdelegates', function (input) {

		(async () => {

			var response = await bapi.listDelegates(1, 100);
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

			socket.emit('blockpoolshowdelegates', flatJson);

		})();

	});

	// Socket IO getblocks

	socket.on('blockpoolgetlastblock', function (input) {

		(async () => {

			var response = await bapi.getLastBlock();
			var data = (response.data);
			var flatJson = {
				getlastblockheight: data.height,
				getlastforgedusername: data.generator.username
			};

			socket.emit('blockpoolshowlastblock', flatJson);

		})();

	});

	// Socket IO getblocks

	socket.on('blockpoolgetblocks', function (input) {

		(async () => {

			var response = await bapi.listBlocks(1, 50);
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
			socket.emit('blockpoolshowblocks', flatJson);
		})();

	});

	// Socket IO getpeers

	socket.on('blockpoolgetpeers', function (input) {

		(async () => {

			var response = await bapi.getPeers();
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

			socket.emit('blockpoolshowpeers', flatJson);
		})();

	});

	// Socket IO gettransactions
	socket.on('blockpoolgettransactions', function (input) {

		(async () => {

			var response = await bapi.listTransactions();
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

			socket.emit('blockpoolshowtransactions', flatJson);

		})();

	});

	// Socket IO getwallet 

	socket.on('blockpoolgetwallet', function (input) {

		(async () => {

			response = await bapi.getWalletByID(input.walletId);

			var data = (response.data);
			var flatJson = {
				address: data.address,
				publickey: data.publicKey,
				balance: (parseFloat(data.balance) / 100000000).toFixed(8),
				isdelegate: data.isDelegate == true ? '<span class="badge badge-success">Yes</span>' : '<span class="badge badge-danger">No</span>'
			};

			socket.emit('blockpoolshowwallet', flatJson);

		})();

	});

	/* gettopwallets */

	socket.on('blockpoolgettopwallets', function (input) {

		(async () => {

			var response = await bapi.getTopWallets();
			var data = response.data;
			var flatJson = [];
			for (let i = 0; i < data.length; i++) {
				let tempJson = {
					rank: data[i].rank,
					isdelegate: data[i].isDelegate == true ? '<span class="badge badge-success">Yes</span>' : '<span class="badge badge-danger">No</span>',
					address: data[i].address,
					balance: data[i].balance
				};
				flatJson.push(tempJson);
			}

			socket.emit('blockpoolshowtopwallets', flatJson);

		})();

	});
	// Socket IO getwallettransactions

	socket.on('blockpoolgetwallettransactions', function (input) {

		(async () => {

			response = await bapi.getWalletTransactions(input.walletId);
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

			socket.emit('blockpoolshowwallettransactions', flatJson);
		})();

	});


	// Socket IO gettransactiondetails

	socket.on('blockpoolgettransactiondetails', function (input) {

		(async () => {

			response = await bapi.getTransactionByID(input.transactionId);

			var data = (response.data);
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
			};

			socket.emit('blockpoolshowtransactiondetails', flatJson);
		})();

	});

	// Socket IO getdelegatebyid 

	socket.on('blockpoolgetdelegatebyid', function (input) {

		(async () => {

			response = await bapi.getDelegate(input.walletId);

			var data = (response.data);

			var flatJson = {
				username: data.username == null ? '<span>Not a delegate</span>' : data.username,
				votes: (parseFloat(data.votes) / 100000000).toFixed(0) + ' BPL',
				rank: data.rank,
				blocksproduced: data.blocks.produced,
				lastproducedblock: data.blocks.last.id,
				approval: data.production.approval + '%',
				isresigned: data.isResigned == true ? '<span class="badge badge-success">Yes</span>' : '<span class="badge badge-danger">No</span>'
			};
			socket.emit('blockpoolshowdelegatebyid', flatJson);

		})();

	});

	// Socket IO getnodeconfig

	socket.on('blockpoolgetnodeconfig', function (input) {

		(async () => {

			var response = await bapi.getNodeConfig();

			var data = (response.data);
			var flatJson = {

			};

			socket.emit('blockpoolshownodeconfig', flatJson);

		})();

	});


	/**************************************************************
																		
	  _  _  ___  ___  ___    ___  ___ _    ___     _   ___ ___
	 | \| |/ _ \|   \| __|  / _ \/ __| |  | _ \   /_\ | _ \_ _|
	 | .` | (_) | |) | _|  | (_) \__ \ |__|  _/  / _ \|  _/| |
	 |_|\_|\___/|___/|___|  \__\_\___/____|_|   /_/ \_\_| |___|

	 
	 **************************************************************/

	/* 

	1. gettokenlist  // done
	2. getwallettokens  // done
	3. gettokeninfo  // done
	4. gettokenmeta  // done

	*/


	/* gettokenlist */

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

	// Socket IO getwallettokens

	socket.on('getwallettokens', function (input) {

		(async () => {

			var response = await qslpapi.getTokensByOwner(input.walletId);
			var data = response;

			var flatJson = [];
			for (let i = 0; i < data.length; i++) {
				let tempJson = {
					type: data[i].type,
					owneraddress: data[i].tokenDetails.ownerAddress,
					tokenid: data[i].tokenDetails.tokenIdHex,
					name: data[i].tokenDetails.name,
					symbol: data[i].tokenDetails.symbol,
					genesisquantity: (data[i].tokenDetails.genesisQuantity == undefined ? '<span class="badge badge-success">NFT (1)</span>' : data[i].tokenDetails.genesisQuantity),
					circsupply: (data[i].tokenStats.qty_token_circulating_supply == undefined ? '<span class="badge badge-success">NFT (1)</span>' : data[i].tokenStats.qty_token_circulating_supply),
					pausable: data[i].tokenDetails.pausable == true ? '<span class="badge badge-success">True</span>' : '<span class="badge badge-danger">False</span>',
					mintable: data[i].tokenDetails.mintable == true ? '<span class="badge badge-success">True</span>' : '<span class="badge badge-danger">False</span>',
					tokenowners: data[i].tokenStats.qty_valid_token_addresses

				};
				flatJson.push(tempJson);
			}

			socket.emit('showwallettokens', flatJson);

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
		})();

	});

	// Socket IO gettokenmeta

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
		})();

	});

	/**************************************************************************

	  _  _  ___  ___  ___   ___ ___ ___  ___  ___  _  _   _       _   ___ ___
	 | \| |/ _ \|   \| __| | _ \ __| _ \/ __|/ _ \| \| | /_\     /_\ | _ \_ _|
	 | .` | (_) | |) | _|  |  _/ _||   /\__ \ (_) | .` |/ _ \   / _ \|  _/| |
	 |_|\_|\___/|___/|___| |_| |___|_|_\|___/\___/|_|\_/_/ \_\ /_/ \_\_| |___|


	 *************************************************************************/

	/*

	1. getpassport  // doto

	*/

	// Socket IO getpassport

	socket.on('getpassport', function (input) {

		(async () => {
			var response = await papi.getPersonaPassport(input.personaAsset, input.walletId);
			var data = response.data;
			console.log(data)
			var flatJson = [];
			var flatJson = {
				/* isMotionAdddress */
				authismotionaddress: data.isMotionAddress.auth == true ? '<span class="badge badge-success">Allowed</span>' : '<span class="badge badge-danger">Denied</span>',
				dataismotionaddress: data.isMotionAddress.data == true ? '<span class="badge badge-success">Yes</span>' : '<span class="badge badge-danger">No</span>',

				/* hasAccountBlocked */
				authhasaccountblocked: data.hasAccountBlocked.auth == true ? '<span class="badge badge-success">Allowed</span>' : '<span class="badge badge-danger">Denied</span>',
				datahasaccountblocked: data.hasAccountBlocked.data == true ? '<span class="badge badge-danger">Account Blocked</span>' : '<span class="badge badge-success">Not Blocked</span>',

				/* profileBanner */
				authprofilebanner: data.profileBanner.auth == true ? '<span class="badge badge-success">Allowed</span>' : '<span class="badge badge-danger">Denied</span>',
				dataprofilebanner: data.profileBanner.data == null ? '<span class="badge badge-danger">Unavailable</span>' : false ? '<span class="badge badge-danger">Unavailable</span>' : '<img style="max-height:75px;" src="' + data.profileBanner.data + '"></a>',

				/* alternateProfilePicture */
				authalternateprofilepicture: data.alternateProfilePicture.auth == true ? '<span class="badge badge-success">Allowed</span>' : '<span class="badge badge-danger">Denied</span>',
				dataalternateprofilepicture: data.alternateProfilePicture.data == null ? '<span class="badge badge-danger">Unavailable</span>' : false ? '<span class="badge badge-danger">Unavailable</span>' : '<img style="max-height:75px;" src="' + data.profileBanner.data + '"></a>',

				/* isKycVerified */
				authiskycverified: data.isKycVerified.auth == true ? '<span class="badge badge-success">Allowed</span>' : '<span class="badge badge-danger">Denied</span>',
				dataiskycverified: data.isKycVerified.data == true ? '<span class="badge badge-success">Yes</span>' : '<span class="badge badge-danger">No</span>',

				/* kycValidTill */
				authkycvalidtill: data.kycValidTill.auth == true ? '<span class="badge badge-success">Allowed</span>' : '<span class="badge badge-danger">Denied</span>',
				datakycvalidtill: data.kycValidTill.data == null ? '<span class="badge badge-danger">Unknown</span>' : data.kycValidTill.data,

				/* hasThisManyContacts */
				authhasthismanycontacts: data.hasThisManyContacts.auth == true ? '<span class="badge badge-success">Allowed</span>' : '<span class="badge badge-danger">Denied</span>',
				datahasthismanycontacts: data.hasThisManyContacts.data == null ? '<span class="badge badge-danger">Unknown</span>' : data.hasThisManyContacts.data + ' Contacts',

				/* alias */
				authalias: data.alias.auth == true ? '<span class="badge badge-success">Allowed</span>' : '<span class="badge badge-danger">Denied</span>',
				dataalias: data.alias.data == null ? '<span class="badge badge-danger">Unknown</span>' : data.alias.data,

				/* accountCreated */
				authaccountcreated: data.accountCreated.auth == true ? '<span class="badge badge-success">Allowed</span>' : '<span class="badge badge-danger">Denied</span>',
				/*dataaccountcreated: data.accountCreated.data == null ? '<span class="badge badge-danger">Unknown</span>' : data.accountCreated.data,*/

				/* lastLogin */
				authlastlogin: data.lastLogin.auth == true ? '<span class="badge badge-success">Allowed</span>' : '<span class="badge badge-danger">Denied</span>',
				datalastlogin: data.lastLogin.data == null ? '<span class="badge badge-danger">Unknown</span>' : data.lastLogin.data,

				/* hasThisAmountOfFiatValue */
				authhasthisamountoffiatvalue: data.hasThisAmountOfFiatValue.auth == true ? '<span class="badge badge-success">Allowed</span>' : '<span class="badge badge-danger">Denied</span>',
				datahasthisamountoffiatvalue: data.hasThisAmountOfFiatValue.data == null ? '<span class="badge badge-danger">Unknown</span>' : (parseFloat(data.hasThisAmountOfFiatValue.data)).toFixed(2) + ' USD',

				/* hasThisAmountOfCryptoValue */
				authhasthisamountofcryptovalue: data.hasThisAmountOfCryptoValue.auth == true ? '<span class="badge badge-success">Allowed</span>' : '<span class="badge badge-danger">Denied</span>',
				datahasthisamountofcryptovalue: data.hasThisAmountOfCryptoValue.data == null ? '<span class="badge badge-danger">Unknown</span>' : (parseFloat(data.hasThisAmountOfCryptoValue.data)).toFixed(2) + ' USD',

				/* hasThisAmountOfAverageMonthlyCryptoValueInWallet */
				authaveragemonthlycryptovalue: data.hasThisAmountOfAverageMonthlyCryptoValueInWallet.auth == true ? '<span class="badge badge-success">Allowed</span>' : '<span class="badge badge-danger">Denied</span>',
				dataaveragemonthlycryptovalue: data.hasThisAmountOfAverageMonthlyCryptoValueInWallet.data == null ? '<span class="badge badge-danger">Unknown</span>' : (parseFloat(data.hasThisAmountOfAverageMonthlyCryptoValueInWallet.data)).toFixed(2) + ' USD',

				/* hasAddressVerified */
				authhasaddressverified: data.hasAddressVerified.auth == true ? '<span class="badge badge-success">Allowed</span>' : '<span class="badge badge-danger">Denied</span>',
				datahasaddressverified: data.hasAddressVerified.data == false ? '<span class="badge badge-danger">No</span>' : data.hasAddressVerified.data,

				/* thisTypeOfUser */
				auththistypeofuser: data.thisTypeOfUser.auth == true ? '<span class="badge badge-success">Allowed</span>' : '<span class="badge badge-danger">Denied</span>',
				datathistypeofuser: data.thisTypeOfUser.data == null ? '<span class="badge badge-danger">Unknown</span>' : data.thisTypeOfUser.data,

				/* hasPhoneVerified */
				authhasphoneverified: data.hasPhoneVerified.auth == true ? '<span class="badge badge-success">Allowed</span>' : '<span class="badge badge-danger">Denied</span>',
				datahasphoneverified: data.hasPhoneVerified.data == true ? '<span class="badge badge-success">Yes</span>' : data.hasPhoneVerified.data,

				/* profileRating */
				authprofilerating: data.profileRating.auth == true ? '<span class="badge badge-success">Allowed</span>' : '<span class="badge badge-danger">Denied</span>',
				dataprofilerating: data.profileRating.data == null ? '<span class="badge badge-danger">Unknown</span>' : data.profileRating.data + ' / 10',

				/* hasEmailVerified */
				authhasemailverified: data.hasEmailVerified.auth == true ? '<span class="badge badge-success">Allowed</span>' : '<span class="badge badge-danger">Denied</span>',
				datahasemailverified: data.hasEmailVerified.data == false ? '<span class="badge badge-danger">No</span>' : data.hasEmailVerified.data,

				/* hasFacebookConnected */
				authhasfacebookconnected: data.hasFacebookConnected.auth == true ? '<span class="badge badge-success">Allowed</span>' : '<span class="badge badge-danger">Denied</span>',
				datahasfacebookconnected: data.hasFacebookConnected.data == false ? '<span class="badge badge-danger">Unknown</span>' : data.hasFacebookConnected.data,

				/* hasLinkedInConnected */
				authhaslinkedinconnected: data.hasLinkedInConnected.auth == true ? '<span class="badge badge-success">Allowed</span>' : '<span class="badge badge-danger">Denied</span>',
				datahaslinkedinconnected: data.hasLinkedInConnected.data == false ? '<span class="badge badge-danger">Unknown</span>' : data.hasLinkedInConnected.data,

			};

			socket.emit('showpassport', flatJson);
			console.log(flatJson)
		})();

	});

	/**************************************************************************

	  _  _  ___  ___  ___    ___  ___  ___     _   ___ ___
	 | \| |/ _ \|   \| __|  / _ \|   \/ __|   /_\ | _ \_ _|
	 | .` | (_) | |) | _|  | (_) | |) \__ \  / _ \|  _/| |
	 |_|\_|\___/|___/|___|  \__\_\___/|___/ /_/ \_\_| |___|


	 *************************************************************************/

	/*

	1. getapifields  // doto
	2. getapidata  // doto

	*/

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


