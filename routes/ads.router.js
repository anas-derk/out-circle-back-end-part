const ads_router = require("express").Router();

const ads_controller = require("../controllers/ads.controller");

const upload = require("../global/multer.module.config");

ads_router.post("/add-new-ads", upload.any(), ads_controller.post_ads);

ads_router.delete("/delete-ads/:ads_id", ads_controller.delete_ads);

ads_router.get("/all-ads", ads_controller.get_all_ads);

ads_router.get("/ads-info/:ads_id", ads_controller.get_ads_info);

module.exports = ads_router;