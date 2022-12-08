// import mongoose module for manipulate with mongo database

const mongoose = require("mongoose");

// import Database Url

const DB_URL = require("./DB_URL");

// create Ads Schema For Ads Model

const ads_schema = mongoose.Schema({
    text: String,
    ads_post_date: {
        type: Date,
        default: Date.now()
    },
    file_paths: Array
});

// create ads User Model In Database

const ads_model = mongoose.model("ad", ads_schema);

function add_ads(ads) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            let new_ads = new ads_model(ads);
            return new_ads.save();
        })
        .then(() => {
            mongoose.disconnect();
            resolve();
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    });
}

function get_all_ads() {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return ads_model.find({}).sort({ ads_post_date: -1 });
        })
        .then((ads_list) => {
            mongoose.disconnect();
            resolve(ads_list);
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    });
}

function delete_ads(ads_id) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return ads_model.deleteOne({ _id: ads_id });
        })
        .then(() => {
            mongoose.disconnect();
            resolve();
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    });
}

function get_ads_details(ads_id) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return ads_model.findById(ads_id);
        })
        .then((ads_info) => {
            mongoose.disconnect();
            resolve(ads_info);
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    });
}

module.exports = {
    add_ads,
    get_all_ads,
    delete_ads,
    get_ads_details
}