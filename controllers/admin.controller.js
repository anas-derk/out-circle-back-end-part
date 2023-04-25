const admin_obj = require("../models/admin.model");

function get_admin_login(req, res) {
    admin_obj.admin_login(req.query.email, req.query.password)
    .then(() => res.json({}))
    .catch(err => res.json(err));
}

module.exports = {
    get_admin_login
}