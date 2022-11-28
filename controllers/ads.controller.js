const ads_obj = require("../models/ads.model");

function post_ads(req, res) {-
    ads_obj.add_ads(req.body)
    .then(() => res.json({}))
    .catch(err => res.json(err));
}

function get_last_ten_ads(req, res) {
    ads_obj.get_last_ten_ads()
    .then(last_ten_ads_list => res.json(last_ten_ads_list))
    .catch(err => res.json(err));
}

function delete_ads(req, res) {
    ads_obj.delete_ads(req.params.ads_id)
    .then(() => res.json({}))
    .catch(err => res.json(err));
}

module.exports = {
    post_ads,
    get_last_ten_ads,
    delete_ads
};