const express = require("express"),
    router = express.Router(),
    bodyParser = require("body-parser"),
    webServices = require("../services/web.services");

router.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

router.get("/", function (req, res, next) {
    res.render("pages/dashboard");
});
router.get("/repost/:appId/preview", webServices.preview);
router.post("/repost/submit", webServices.submit);

module.exports = router;