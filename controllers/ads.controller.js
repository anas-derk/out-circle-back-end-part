const ads_obj = require("../models/ads.model");

const { handle_user_info } = require("../global/functions");

function post_ads(req, res) {
    let ads_info = handle_user_info(req.files, req.body);
    ads_obj.add_ads(ads_info)
    .then(() => res.json({}))
    .catch(err => res.json(err));
}

function get_all_ads(req, res) {
    ads_obj.get_all_ads()   
    .then(ads_list => res.json(ads_list))
    .catch(err => {
        res.json(err);
    });
}

function delete_ads(req, res) {
    ads_obj.delete_ads(req.params.ads_id)
    .then(() => res.json({}))
    .catch(err => res.json(err));
}

module.exports = {
    post_ads,
    get_all_ads,
    delete_ads
};