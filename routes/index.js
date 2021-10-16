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







/* GET ark pages. */
router.get("/ark/transactions", function (req, res, next) {
  res.render("ark/transactions", {
    title: "Ark",
    routename: "ark/transactions",
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




/* GET qredit pages. */
router.get("/qredit/transactions", function (req, res, next) {
  res.render("qredit/transactions", {
    title: "Qredit",
    routename: "qredit/transactions",
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








/* GET blockpool pages. */
router.get("/blockpool/transactions", function (req, res, next) {
  res.render("blockpool/transactions", {
    title: "Blockpool",
    routename: "blockpool/transactions",
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


module.exports = router;
