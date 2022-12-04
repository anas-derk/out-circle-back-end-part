// import mongoose module for manipulate with mongo database

const mongoose = require("mongoose");

// import Database Url

const DB_URL = require("./DB_URL");

// create Notification Schema For News Model

const notification_schema = mongoose.Schema({
    email: String,
    content: String,
    notification_post_date: {
        type: Date,
        default: Date.now()
    }
});

// create Notification Model In Database

const notification_model = mongoose.model("notification", notification_schema);

function add_notification(email, content) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            let new_notification = new notification_model({
                email,
                content
            });
            return new_notification.save();
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

function get_all_notifications(email) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return notification_model.find({ email }).sort({ notification_post_date: -1 });
        })
        .then((notifications_list) => {
            mongoose.disconnect();
            resolve(notifications_list);
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    });
}

module.exports = {
    add_notification,
    get_all_notifications
}