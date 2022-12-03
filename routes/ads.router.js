const ads_router = require("express").Router();

const ads_controller = require("../controllers/ads.controller");

ads_router.post("/add-new-ads", ads_controller.post_ads);

ads_router.delete("/delete-ads/:ads_id", ads_controller.delete_ads);

news_router.get("/all-ads", ads_controller.get_all_ads);

module.exports = ads_router;