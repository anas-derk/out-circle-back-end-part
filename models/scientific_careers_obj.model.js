// import mongoose module for manipulate with mongo database

const mongoose = require("mongoose");

// import Database Url

const DB_URL = require("./DB_URL");

// create Scientific Career User Schema For Scientific Career User Model

const scientific_career_user_schema = mongoose.Schema({
    user_name: String,
    password: String,
    full_name: String,
    birthday: Date,
    city: String,
    current_address: String,
    craftsmanship: String,
    work_start_date: Date,
    landline_number: Number,
    phone_number: Number,
    whatsapp_number: Number,
    email: String,
    file_src: String,
    account_type: {
        default: "scientific_career",
        type: String
    }
});

// create Scientific Career User Model In Database

const scientific_career_user_model = mongoose.model("scientific_career", scientific_career_user_schema);

// require bcryptjs module for password encrypting

const bcrypt = require("bcryptjs");

// define create new scientific career user account function

function create_scientific_careers_user_account(userInfo) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return scientific_career_user_model.findOne({ email: userInfo.email });
        })
        .then((user) => {
            if (user) {
                mongoose.disconnect();
                reject("عذراً البريد الالكتروني الذي أدخلته موجود مسبقاً ،  من فضلك أدخل بريد الكتروني آخر ...")
            } else {
                return mongoose.models.companie.findOne({ email: userInfo.email });
            }
        })
        .then((user) => {
            if (user) {
                mongoose.disconnect();
                reject("عذراً البريد الالكتروني الذي أدخلته موجود مسبقاً ،  من فضلك أدخل بريد الكتروني آخر ...")
            } else {
                return mongoose.models.craftsman.findOne({ email: userInfo.email });
            }
        })
        .then((user) => {
            if (user) {
                mongoose.disconnect();
                reject("عذراً البريد الالكتروني الذي أدخلته موجود مسبقاً ،  من فضلك أدخل بريد الكتروني آخر ...")
            } else {
                return mongoose.models.institute.findOne({ email: userInfo.email });
            }
        })
        .then((user) => {
            if (user) {
                mongoose.disconnect();
                reject("عذراً البريد الالكتروني الذي أدخلته موجود مسبقاً ،  من فضلك أدخل بريد الكتروني آخر ...")
            } else {
                return mongoose.models.individual.findOne({ email: userInfo.email });
            }
        })
        .then((user) => {
            if (user) {
                mongoose.disconnect();
                reject("عذراً البريد الالكتروني الذي أدخلته موجود مسبقاً ،  من فضلك أدخل بريد الكتروني آخر ...")
            } else {
                return mongoose.models.partner.findOne({ email: userInfo.email });
            }
        })
        .then((user) => {
            if (user) {
                mongoose.disconnect();
                reject("عذراً البريد الالكتروني الذي أدخلته موجود مسبقاً ،  من فضلك أدخل بريد الكتروني آخر ...")
            } else {
                let password = userInfo.password;
                return bcrypt.hash(password, 10);
            }
        })
        .then(encrypted_password => {
            userInfo.password = encrypted_password;
            let new_scientific_career_user = new scientific_career_user_model(userInfo);
            return new_scientific_career_user.save();
        })
        .then(() => {
            mongoose.disconnect();
            resolve();
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        });
    });
}

function get_scientific_career_info(scientific_career_id) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return scientific_career_user_model.findById(scientific_career_id);
        })
        .then(scientific_career_info => {
            mongoose.disconnect();
            resolve(scientific_career_info);
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        });
    });
}

function update_scientific_career_info(user_id, new_user_info) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            let new_user_info_obj = {
                city: new_user_info.city,
                current_address: new_user_info.current_address,
                landline_number: new_user_info.landline_number,
                phone_number: new_user_info.phone_number,
                whatsapp_number: new_user_info.whatsapp_number,
                email: new_user_info.email,
                file_src: new_user_info.file_src,
            };
            scientific_career_user_model.updateOne({ _id: user_id }, new_user_info_obj)
            .then(() => {
                mongoose.disconnect();
                resolve(new_user_info_obj);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}

module.exports = {
    create_scientific_careers_user_account,
    get_scientific_career_info,
    update_scientific_career_info
};