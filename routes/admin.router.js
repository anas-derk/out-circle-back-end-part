const admin_router = require("express").Router();

const admin_controller = require("../controllers/admin.controller");

// admin_router.post("/add-new-user", admin_controller.post_admin_user);

admin_router.get("/login", admin_controller.get_admin_login);

module.exports = admin_router;