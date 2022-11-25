const admin_obj = require("../models/admin.model");

function post_admin_user(req, res) {
    admin_obj.create_admin_user_account(req.body)
    .then(() => res.json({}))
    .catch(err => res.json(err));
}

function get_admin_login(req, res) {
    admin_obj.admin_login(req.body)
    .then(() => res.json({}))
    .catch(err => res.json(err));
}

module.exports = {
    post_admin_user,
    get_admin_login
}