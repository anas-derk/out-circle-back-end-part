const users_router = require("express").Router();

const users_controller = require("../controllers/users.controller");

users_router.get("/user-info", users_controller.get_login);

users_router.put("/update-user-password/:user_id", users_controller.put_user_password);

users_router.post("/forget-password", users_controller.post_forget_password);

users_router.put("/reset-password/:user_id", users_controller.put_reset_user_password);

module.exports = users_router;