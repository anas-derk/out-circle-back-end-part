const individuals_router = require("express").Router();

const individuals_controller = require("../controllers/individuals.controller");

const upload = require("../global/multer.module.config");

individuals_router.post("/add-new-user", upload.any(), individuals_controller.post_individual_account);

individuals_router.get("/individual-user-info/:individual_user_id", individuals_controller.get_individual_user_info);

individuals_router.put("/update-individual-user-info/:individual_user_id", upload.any(), individuals_controller.put_individual_user_info);

module.exports = individuals_router;