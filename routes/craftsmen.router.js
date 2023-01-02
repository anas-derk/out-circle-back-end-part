const craftsmen_router = require("express").Router();

const craftsmen_controller = require("../controllers/craftsmen.controller");

const upload = require("../global/multer.module.config");

craftsmen_router.post("/add-new-user", upload.any() , craftsmen_controller.post_craftsman_account);

craftsmen_router.get("/craftsman-user-info/:craftsman_id", craftsmen_controller.get_craftsman_user_info);

craftsmen_router.get("/all-craftsmen-users-info", craftsmen_controller.get_all_craftsmen_users_info);

craftsmen_router.put("/update-craftsman-user-info/:craftsman_id", upload.any(), craftsmen_controller.put_craftsman_info);

module.exports = craftsmen_router;