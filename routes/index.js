var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Qredit",
    routename: "home",
    csrfToken: req.csrfToken()
  });
});


/* GET explorer page. */
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

module.exports = router;
