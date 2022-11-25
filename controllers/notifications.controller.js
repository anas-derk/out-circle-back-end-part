const notification_obj = require("../models/notifications.model");

function post_notification(req, res) {
    const data = req.body;
    notification_obj.add_notification(data.email, data.content)
    .then(() => res.json())
    .catch(err => res.json(err));
}

function get_all_user_notifications(req, res) {
    notification_obj.get_all_notifications(req.body)
    .then(notifications_info => res.json(notifications_info))
    .catch(err => res.json(err));
}

module.exports = {
    post_notification,
    get_all_user_notifications
}