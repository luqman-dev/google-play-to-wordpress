const express = require("express"),
    router = express.Router(),
    apiServices = require("../services/api.services");

router.get("/api/ps/get", apiServices.get);
router.get("/api/wp/categories", apiServices.categories);
router.get("/api/wp/tags", apiServices.tags);

module.exports = router;