const notifications_router = require("express").Router();

const notifications_controller = require("../controllers/notifications.controller");

notifications_router.post("/admin/notifications/add-new-notification", notifications_controller.post_notification);

notifications_router.get("/admin/notifications/all-notifications", notifications_controller.get_all_notifications);

module.exports = notifications_router;