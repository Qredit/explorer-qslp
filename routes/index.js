var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Explorer.sh",
    routename: "home",
    csrfToken: req.csrfToken()
  });
});

/* GET home page qredit mainnet. */
router.get("/qredit", function (req, res, next) {
  res.render("qredit/transactions", {
    title: "Explorer.sh",
    routename: "qredit",
    csrfToken: req.csrfToken()
  });
});
/* GET home page qredit testnet. */
router.get("/qredit-testnet", function (req, res, next) {
  res.render("qredit-testnet/transactions", {
    title: "Explorer.sh",
    routename: "qredit",
    csrfToken: req.csrfToken()
  });
});
/* GET home page blockpool mainnet. */
router.get("/blockpool", function (req, res, next) {
  res.render("blockpool/transactions", {
    title: "Explorer.sh",
    routename: "blockpool",
    csrfToken: req.csrfToken()
  });
});
/* GET home page ark mainnet. */
router.get("/ark", function (req, res, next) {
  res.render("ark/transactions", {
    title: "Explorer.sh",
    routename: "ark",
    csrfToken: req.csrfToken()
  });
});
/* GET home page ark devnet. */
router.get("/dark", function (req, res, next) {
  res.render("dark/transactions", {
    title: "Explorer.sh",
    routename: "dark",
    csrfToken: req.csrfToken()
  });
});
/* GET home radians testnet. */
router.get("/radians", function (req, res, next) {
  res.render("radians/transactions", {
    title: "Explorer.sh",
    routename: "radians",
    csrfToken: req.csrfToken()
  });
});

/* GET home page qredit mainnet. */
router.get("/dswipe", function (req, res, next) {
  res.render("dswipe/transactions", {
    title: "Explorer.sh",
    routename: "dswipe",
    csrfToken: req.csrfToken()
  });
});




/* GET ark devnet (dark) pages. */
router.get("/dark/transactions", function (req, res, next) {
  res.render("dark/transactions", {
    title: "dark",
    routename: "dark/transactions",
    csrfToken: req.csrfToken()
  });
});
router.get("/dark/block", function (req, res, next) {
  res.render("dark/block", {
    title: "Block",
    routename: "dark/block",
    csrfToken: req.csrfToken()
  });
});
router.get("/dark/tokenlist", function (req, res, next) {
  res.render("dark/tokenlist", {
    title: "Token List",
    routename: "dark/tokenlist",
    csrfToken: req.csrfToken()
  });
});

router.get("/dark/latestblocks", function (req, res, next) {
  res.render("dark/latestblocks", {
    title: "Latest Blocks",
    routename: "dark/latestblocks",
    csrfToken: req.csrfToken()
  });
});
router.get("/dark/peers", function (req, res, next) {
  res.render("dark/peers", {
    title: "Peers",
    routename: "dark/peers",
    csrfToken: req.csrfToken()
  });
});
router.get("/dark/topwallets", function (req, res, next) {
  res.render("dark/topwallets", {
    title: "Top Wallets",
    routename: "dark/topwallets",
    csrfToken: req.csrfToken()
  });
});
router.get("/dark/delegatemonitor", function (req, res, next) {
  res.render("dark/delegatemonitor", {
    title: "Delegate Monitor",
    routename: "dark/delegatemonitor",
    csrfToken: req.csrfToken()
  });
});

router.get("/dark/nodeconfig", function (req, res, next) {
  res.render("dark/nodeconfig", {
    title: "Node Configuration",
    routename: "dark/nodeconfig",
    csrfToken: req.csrfToken()
  });
});


/* GET dswipe pages. */
router.get("/dswipe/transactions", function (req, res, next) {
  res.render("dswipe/transactions", {
    title: "Swipe Testnet",
    routename: "dswipe/transactions",
    csrfToken: req.csrfToken()
  });
});
router.get("/dswipe/block", function (req, res, next) {
  res.render("dswipe/block", {
    title: "Block",
    routename: "dswipe/block",
    csrfToken: req.csrfToken()
  });
});
router.get("/dswipe/tokenlist", function (req, res, next) {
  res.render("dswipe/tokenlist", {
    title: "Token List",
    routename: "dswipe/tokenlist",
    csrfToken: req.csrfToken()
  });
});

router.get("/dswipe/latestblocks", function (req, res, next) {
  res.render("dswipe/latestblocks", {
    title: "Latest Blocks",
    routename: "dswipe/latestblocks",
    csrfToken: req.csrfToken()
  });
});
router.get("/dswipe/peers", function (req, res, next) {
  res.render("dswipe/peers", {
    title: "Peers",
    routename: "dswipe/peers",
    csrfToken: req.csrfToken()
  });
});
router.get("/dswipe/topwallets", function (req, res, next) {
  res.render("dswipe/topwallets", {
    title: "Top Wallets",
    routename: "dswipe/topwallets",
    csrfToken: req.csrfToken()
  });
});
router.get("/dswipe/delegatemonitor", function (req, res, next) {
  res.render("dswipe/delegatemonitor", {
    title: "Delegate Monitor",
    routename: "dswipe/delegatemonitor",
    csrfToken: req.csrfToken()
  });
});

router.get("/dswipe/nodeconfig", function (req, res, next) {
  res.render("dswipe/nodeconfig", {
    title: "Node Configuration",
    routename: "dswipe/nodeconfig",
    csrfToken: req.csrfToken()
  });
});

/* Explorer URL Parameter routes*/

router.get("/dswipe/transaction/:transactionId", function (req, res, next) {
  res.render("dswipe/transaction", {
    title: "Transaction Details",
    routename: "dswipe/transaction",
    transactionId: req.params.transactionId,
    csrfToken: req.csrfToken()
  });
});

router.get("/dswipe/wallet/:walletId", function (req, res, next) {
  res.render("dswipe/wallet", {
    title: "Wallet Details",
    routename: "sender",
    walletId: req.params.walletId,
    csrfToken: req.csrfToken()
  });
});

router.get("/dswipe/token/:tokenid", function (req, res, next) {
  res.render("dswipe/token", {
    title: "Token Details",
    routename: "dswipe/token",
    tokenid: req.params.tokenid,
    csrfToken: req.csrfToken()
  });
});
router.get("/dswipe/block/:blockId", function (req, res, next) {
  res.render("dswipe/block", {
    title: "Block Details",
    routename: "sender",
    walletId: req.params.blockId,
    csrfToken: req.csrfToken()
  });
});


/* Explorer URL Parameter routes*/

router.get("/dark/transaction/:transactionId", function (req, res, next) {
  res.render("dark/transaction", {
    title: "Transaction Details",
    routename: "dark/transaction",
    transactionId: req.params.transactionId,
    csrfToken: req.csrfToken()
  });
});

router.get("/dark/wallet/:walletId", function (req, res, next) {
  res.render("dark/wallet", {
    title: "Wallet Details",
    routename: "sender",
    walletId: req.params.walletId,
    csrfToken: req.csrfToken()
  });
});

router.get("/dark/token/:tokenid", function (req, res, next) {
  res.render("dark/token", {
    title: "Token Details",
    routename: "dark/token",
    tokenid: req.params.tokenid,
    csrfToken: req.csrfToken()
  });
});
router.get("/dark/block/:blockId", function (req, res, next) {
  res.render("dark/block", {
    title: "Block Details",
    routename: "sender",
    walletId: req.params.blockId,
    csrfToken: req.csrfToken()
  });
});

/* GET ark pages. */
router.get("/ark/transactions", function (req, res, next) {
  res.render("ark/transactions", {
    title: "Ark",
    routename: "ark/transactions",
    csrfToken: req.csrfToken()
  });
});
router.get("/ark/block", function (req, res, next) {
  res.render("ark/block", {
    title: "Blocks",
    routename: "ark/block",
    csrfToken: req.csrfToken()
  });
});
router.get("/ark/tokenlist", function (req, res, next) {
  res.render("ark/tokenlist", {
    title: "Token List",
    routename: "ark/tokenlist",
    csrfToken: req.csrfToken()
  });
});

router.get("/ark/latestblocks", function (req, res, next) {
  res.render("ark/latestblocks", {
    title: "Latest Blocks",
    routename: "ark/latestblocks",
    csrfToken: req.csrfToken()
  });
});
router.get("/ark/peers", function (req, res, next) {
  res.render("ark/peers", {
    title: "Peers",
    routename: "ark/peers",
    csrfToken: req.csrfToken()
  });
});
router.get("/ark/topwallets", function (req, res, next) {
  res.render("ark/topwallets", {
    title: "Top Wallets",
    routename: "ark/topwallets",
    csrfToken: req.csrfToken()
  });
});
router.get("/ark/delegatemonitor", function (req, res, next) {
  res.render("ark/delegatemonitor", {
    title: "Delegate Monitor",
    routename: "ark/delegatemonitor",
    csrfToken: req.csrfToken()
  });
});

router.get("/ark/nodeconfig", function (req, res, next) {
  res.render("ark/nodeconfig", {
    title: "Node Configuration",
    routename: "ark/nodeconfig",
    csrfToken: req.csrfToken()
  });
});

/* Explorer URL Parameter routes*/

router.get("/ark/transaction/:transactionId", function (req, res, next) {
  res.render("ark/transaction", {
    title: "Transaction Details",
    routename: "ark/transaction",
    transactionId: req.params.transactionId,
    csrfToken: req.csrfToken()
  });
});

router.get("/ark/wallet/:walletId", function (req, res, next) {
  res.render("ark/wallet", {
    title: "Wallet Details",
    routename: "sender",
    walletId: req.params.walletId,
    csrfToken: req.csrfToken()
  });
});

router.get("/ark/token/:tokenid", function (req, res, next) {
  res.render("ark/token", {
    title: "Token Details",
    routename: "ark/token",
    tokenid: req.params.tokenid,
    csrfToken: req.csrfToken()
  });
});
router.get("/ark/block/:blockId", function (req, res, next) {
  res.render("ark/block", {
    title: "Block Details",
    routename: "sender",
    walletId: req.params.blockId,
    csrfToken: req.csrfToken()
  });
});

/* GET qredit pages. */
router.get("/qredit/transactions", function (req, res, next) {
  res.render("qredit/transactions", {
    title: "Qredit",
    routename: "qredit/transactions",
    csrfToken: req.csrfToken()
  });
});
router.get("/qredit/block", function (req, res, next) {
  res.render("qredit/block", {
    title: "Block",
    routename: "qredit/block",
    csrfToken: req.csrfToken()
  });
});
router.get("/qredit/tokenlist", function (req, res, next) {
  res.render("qredit/tokenlist", {
    title: "Token List",
    routename: "qredit/tokenlist",
    csrfToken: req.csrfToken()
  });
});

router.get("/qredit/latestblocks", function (req, res, next) {
  res.render("qredit/latestblocks", {
    title: "Latest Blocks",
    routename: "qredit/latestblocks",
    csrfToken: req.csrfToken()
  });
});
router.get("/qredit/peers", function (req, res, next) {
  res.render("qredit/peers", {
    title: "Peers",
    routename: "qredit/peers",
    csrfToken: req.csrfToken()
  });
});
router.get("/qredit/topwallets", function (req, res, next) {
  res.render("qredit/topwallets", {
    title: "Top Wallets",
    routename: "qredit/topwallets",
    csrfToken: req.csrfToken()
  });
});
router.get("/qredit/delegatemonitor", function (req, res, next) {
  res.render("qredit/delegatemonitor", {
    title: "Delegate Monitor",
    routename: "qredit/delegatemonitor",
    csrfToken: req.csrfToken()
  });
});

router.get("/qredit/nodeconfig", function (req, res, next) {
  res.render("qredit/nodeconfig", {
    title: "Node Configuration",
    routename: "qredit/nodeconfig",
    csrfToken: req.csrfToken()
  });
});

/* Explorer URL Parameter routes*/

router.get("/qredit/transaction/:transactionId", function (req, res, next) {
  res.render("qredit/transaction", {
    title: "Transaction Details",
    routename: "qredit/transaction",
    transactionId: req.params.transactionId,
    csrfToken: req.csrfToken()
  });
});

router.get("/qredit/wallet/:walletId", function (req, res, next) {
  res.render("qredit/wallet", {
    title: "Wallet Details",
    routename: "sender",
    walletId: req.params.walletId,
    csrfToken: req.csrfToken()
  });
});

router.get("/qredit/token/:tokenid", function (req, res, next) {
  res.render("qredit/token", {
    title: "Token Details",
    routename: "qredit/token",
    tokenid: req.params.tokenid,
    csrfToken: req.csrfToken()
  });
});
router.get("/qredit/block/:blockId", function (req, res, next) {
  res.render("qredit/block", {
    title: "Block Details",
    routename: "sender",
    walletId: req.params.blockId,
    csrfToken: req.csrfToken()
  });
});







/* GET blockpool pages. */
router.get("/blockpool/transactions", function (req, res, next) {
  res.render("blockpool/transactions", {
    title: "Blockpool",
    routename: "blockpool/transactions",
    csrfToken: req.csrfToken()
  });
});
router.get("/blockpool/block", function (req, res, next) {
  res.render("blockpool/block", {
    title: "Block",
    routename: "blockpool/block",
    csrfToken: req.csrfToken()
  });
});
router.get("/blockpool/latestblocks", function (req, res, next) {
  res.render("blockpool/latestblocks", {
    title: "Latest Blocks",
    routename: "blockpool/latestblocks",
    csrfToken: req.csrfToken()
  });
});
router.get("/blockpool/peers", function (req, res, next) {
  res.render("blockpool/peers", {
    title: "Peers",
    routename: "blockpool/peers",
    csrfToken: req.csrfToken()
  });
});
router.get("/blockpool/topwallets", function (req, res, next) {
  res.render("blockpool/topwallets", {
    title: "Top Wallets",
    routename: "blockpool/topwallets",
    csrfToken: req.csrfToken()
  });
});
router.get("/blockpool/delegatemonitor", function (req, res, next) {
  res.render("blockpool/delegatemonitor", {
    title: "Delegate Monitor",
    routename: "blockpool/delegatemonitor",
    csrfToken: req.csrfToken()
  });
});

router.get("/blockpool/nodeconfig", function (req, res, next) {
  res.render("blockpool/nodeconfig", {
    title: "Node Configuration",
    routename: "blockpool/nodeconfig",
    csrfToken: req.csrfToken()
  });
});

/* Explorer URL Parameter routes*/

router.get("/blockpool/transaction/:transactionId", function (req, res, next) {
  res.render("blockpool/transaction", {
    title: "Transaction Details",
    routename: "blockpool/transaction",
    transactionId: req.params.transactionId,
    csrfToken: req.csrfToken()
  });
});

router.get("/blockpool/wallet/:walletId", function (req, res, next) {
  res.render("blockpool/wallet", {
    title: "Wallet Details",
    routename: "sender",
    walletId: req.params.walletId,
    csrfToken: req.csrfToken()
  });
});
router.get("/blockpool/block/:blockId", function (req, res, next) {
  res.render("blockpool/block", {
    title: "Block Details",
    routename: "sender",
    walletId: req.params.blockId,
    csrfToken: req.csrfToken()
  });
});


/* GET radians pages. */
router.get("/radians/transactions", function (req, res, next) {
  res.render("radians/transactions", {
    title: "Radians",
    routename: "radians/transactions",
    csrfToken: req.csrfToken()
  });
});
router.get("/radians/block", function (req, res, next) {
  res.render("radians/block", {
    title: "Block",
    routename: "radians/block",
    csrfToken: req.csrfToken()
  });
});
router.get("/radians/latestblocks", function (req, res, next) {
  res.render("radians/latestblocks", {
    title: "Latest Blocks",
    routename: "radians/latestblocks",
    csrfToken: req.csrfToken()
  });
});
router.get("/radians/peers", function (req, res, next) {
  res.render("radians/peers", {
    title: "Peers",
    routename: "radians/peers",
    csrfToken: req.csrfToken()
  });
});
router.get("/radians/topwallets", function (req, res, next) {
  res.render("radians/topwallets", {
    title: "Top Wallets",
    routename: "radians/topwallets",
    csrfToken: req.csrfToken()
  });
});
router.get("/radians/delegatemonitor", function (req, res, next) {
  res.render("radians/delegatemonitor", {
    title: "Delegate Monitor",
    routename: "radians/delegatemonitor",
    csrfToken: req.csrfToken()
  });
});

router.get("/radians/nodeconfig", function (req, res, next) {
  res.render("radians/nodeconfig", {
    title: "Node Configuration",
    routename: "radians/nodeconfig",
    csrfToken: req.csrfToken()
  });
});

/* Explorer URL Parameter routes*/

router.get("/radians/transaction/:transactionId", function (req, res, next) {
  res.render("radians/transaction", {
    title: "Transaction Details",
    routename: "radians/transaction",
    transactionId: req.params.transactionId,
    csrfToken: req.csrfToken()
  });
});

router.get("/radians/wallet/:walletId", function (req, res, next) {
  res.render("radians/wallet", {
    title: "Wallet Details",
    routename: "sender",
    walletId: req.params.walletId,
    csrfToken: req.csrfToken()
  });
});

router.get("/radians/block/:blockId", function (req, res, next) {
  res.render("radians/block", {
    title: "Block Details",
    routename: "sender",
    walletId: req.params.blockId,
    csrfToken: req.csrfToken()
  });
});



/* GET qredit-testnet pages. */
router.get("/qredit-testnet/transactions", function (req, res, next) {
  res.render("qredit-testnet/transactions", {
    title: "qredit-testnet",
    routename: "qredit-testnet/transactions",
    csrfToken: req.csrfToken()
  });
});
router.get("/qredit-testnet/block", function (req, res, next) {
  res.render("qredit-testnet/block", {
    title: "Block",
    routename: "qredit-testnet/block",
    csrfToken: req.csrfToken()
  });
});
router.get("/qredit-testnet/latestblocks", function (req, res, next) {
  res.render("qredit-testnet/latestblocks", {
    title: "Latest Blocks",
    routename: "qredit-testnet/latestblocks",
    csrfToken: req.csrfToken()
  });
});
router.get("/qredit-testnet/peers", function (req, res, next) {
  res.render("qredit-testnet/peers", {
    title: "Peers",
    routename: "qredit-testnet/peers",
    csrfToken: req.csrfToken()
  });
});
router.get("/qredit-testnet/topwallets", function (req, res, next) {
  res.render("qredit-testnet/topwallets", {
    title: "Top Wallets",
    routename: "qredit-testnet/topwallets",
    csrfToken: req.csrfToken()
  });
});
router.get("/qredit-testnet/delegatemonitor", function (req, res, next) {
  res.render("qredit-testnet/delegatemonitor", {
    title: "Delegate Monitor",
    routename: "qredit-testnet/delegatemonitor",
    csrfToken: req.csrfToken()
  });
});

router.get("/qredit-testnet/nodeconfig", function (req, res, next) {
  res.render("qredit-testnet/nodeconfig", {
    title: "Node Configuration",
    routename: "qredit-testnet/nodeconfig",
    csrfToken: req.csrfToken()
  });
});

/* Explorer URL Parameter routes*/

router.get("/qredit-testnet/transaction/:transactionId", function (req, res, next) {
  res.render("qredit-testnet/transaction", {
    title: "Transaction Details",
    routename: "qredit-testnet/transaction",
    transactionId: req.params.transactionId,
    csrfToken: req.csrfToken()
  });
});

router.get("/qredit-testnet/wallet/:walletId", function (req, res, next) {
  res.render("qredit-testnet/wallet", {
    title: "Wallet Details",
    routename: "sender",
    walletId: req.params.walletId,
    csrfToken: req.csrfToken()
  });
});
router.get("/qredit-testnet/block/:blockId", function (req, res, next) {
  res.render("qredit-testnet/block", {
    title: "Block Details",
    routename: "sender",
    walletId: req.params.blockId,
    csrfToken: req.csrfToken()
  });
});



module.exports = router;
