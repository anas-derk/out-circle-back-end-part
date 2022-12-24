const partners_obj = require("../models/partners.model");

function is_partner_user_account_exist(req, res) {
    partners_obj.is_partner_user_account_exist(req.query.email).then(result => {
        res.json(result);
    }).catch(err => res.json(err));
}

function post_partners(req, res) {
    const partners_info = req.body.partners_info.map((partner_info) => {
        partner_info = {...partner_info, company_id: req.query.company_id};
        return partner_info;
    });
    partners_obj.insert_partners_info(partners_info).then(() => {
        res.json({});
    }).catch(err => res.json(err));
}

function get_partners_info(req, res) {
    partners_obj.get_partners_info(req.params.company_id).then(partners_info => {
        res.json(partners_info);
    }).catch(err => res.json(err));
}

function put_partner_info(req, res) {
    partners_obj.update_partner_info(req.params.partner_id, req.body).then(() => {
        res.json({});
    }).catch(err => res.json(err));
}

module.exports = {
    is_partner_user_account_exist,
    post_partners,
    get_partners_info,
    put_partner_info
};