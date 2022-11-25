// import mongoose module for manipulate with mongo database

const mongoose = require("mongoose");

// import Database Url

const DB_URL = require("./DB_URL");

// create News Schema For News Model

const news_schema = mongoose.Schema({
    content: String,
    news_post_date: {
        type: Date,
        default: Date.now()
    }
});

// create News User Model In Database

const news_model = mongoose.model("new", news_schema);

function add_news(news) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            let new_news = new news_model(news);
            return new_news.save();
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

function get_last_ten_news() {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return news_model.find({}).sort({ news_post_date: -1 }).limit(10);
        })
        .then((last_ten_news_list) => {
            mongoose.disconnect();
            resolve(last_ten_news_list);
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    });
}

function get_all_news() {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return news_model.find({});
        })
        .then((news_list) => {
            mongoose.disconnect();
            resolve(news_list);
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    });
}

function delete_news(news_id) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return news_model.deleteOne({ _id: news_id });
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

module.exports = {
    add_news,
    get_last_ten_news,
    get_all_news,
    delete_news
}