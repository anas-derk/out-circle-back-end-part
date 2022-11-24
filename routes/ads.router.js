const ads_router = require("express").Router();

const ads_controller = require("../controllers/ads.controller");

ads_router.post("/admin/ads/add-new-ads", ads_controller.post_ads);

ads_router.delete("/admin/ads/delete-ads/:ads_id", ads_controller.delete_ads);

ads_router.get("/admin/ads/all-ads", ads_controller.get_all_ads);

module.exports = ads_router;