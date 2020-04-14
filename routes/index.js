var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Qredit Explorer",
    routename: "home",
    csrfToken: req.csrfToken()
  });
});

/* GET explorer page. */
router.get("/transactions", function (req, res, next) {
  res.render("transactions", {
    title: "Transactions",
    routename: "transactions",
    csrfToken: req.csrfToken()
  });
});
router.get("/tokenlist", function (req, res, next) {
  res.render("tokenlist", {
    title: "Token List",
    routename: "tokenlist",
    csrfToken: req.csrfToken()
  });
});
router.get("/peers", function (req, res, next) {
  res.render("peers", {
    title: "Peers",
    routename: "peers",
    csrfToken: req.csrfToken()
  });
});
router.get("/topwallets", function (req, res, next) {
  res.render("topwallets", {
    title: "Top Wallets",
    routename: "topwallets",
    csrfToken: req.csrfToken()
  });
});
router.get("/delegatemonitor", function (req, res, next) {
  res.render("delegatemonitor", {
    title: "Delegate Monitor",
    routename: "delegatemonitor",
    csrfToken: req.csrfToken()
  });
});

/* Explorer URL Parameter routes*/

router.get("/transaction/:transactionId", function (req, res, next) {
  res.render("transaction", {
    title: "Transaction Details",
    routename: "transaction",
    transactionId: req.params.transactionId,
    csrfToken: req.csrfToken()
  });
});

router.get("/wallet/:walletId", function (req, res, next) {
  res.render("wallet", {
    title: "Wallet Details",
    routename: "sender",
    walletId: req.params.walletId,
    csrfToken: req.csrfToken()
  });
});

router.get("/token/:tokenid", function (req, res, next) {
  res.render("token", {
    title: "Token Details",
    routename: "token",
    tokenid: req.params.tokenid,
    csrfToken: req.csrfToken()
  });
});



module.exports = router;
