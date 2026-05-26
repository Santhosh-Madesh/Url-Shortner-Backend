const router = require("express").Router();

const {
    demoController,
    createShortUrl,
    retriveUrl,
    updateUrl,
    deleteUrl,
    getUrlStats
} = require("../controllers/urlControllers");

// Routes

router.post("/shorten", createShortUrl);
router.get("/shorten/:shorturl", retriveUrl);
router.put("/shorten/:shorturl", updateUrl);
router.delete("/shorten/:shorturl", deleteUrl);
router.get("/shorten/:shorturl/stats", getUrlStats);

module.exports = router;