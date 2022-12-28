// import mongoose module for manipulate with mongo database

const mongoose = require("mongoose");

// import Database Url

const DB_URL = require("./DB_URL");

// create Craftsman User Schema For Craftsman User Model

const craftsman_user_schema = mongoose.Schema({
    user_name: String,
    password: String,
    full_name: String,
    birthday: String,
    city: String,
    current_address: String,
    scientific_certificate: String,
    craftsmanship: String,
    work_start_date: String,
    work_address: String,
    landline_number: String,
    phone_number: String,
    whatsapp_number: String,
    email: String,
    file_paths: Array,
    account_type: {
        default: "craftsman",
        type: String
    }
});

// create Craftsman User Model In Database

const craftsman_user_model = mongoose.model("craftsman", craftsman_user_schema);

// require bcryptjs module for password encrypting

const bcrypt = require("bcryptjs");

// define create new craftsman user account function

function create_craftsman_user_account(userInfo) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return craftsman_user_model.findOne({ email: userInfo.email });
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
                return mongoose.models.individual.findOne({ email: userInfo.email });
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
                return mongoose.models.scientific_career.findOne({ email: userInfo.email });
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
            let new_craftsman_user = new craftsman_user_model(userInfo);
            return new_craftsman_user.save();
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

function get_craftsman_user_info(craftsman_user_id) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return craftsman_user_model.findById(craftsman_user_id);
        })
        .then(craftsman_user_info => {
            mongoose.disconnect();
            resolve(craftsman_user_info);
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        });
    });
}

function update_craftsman_info(user_id, new_user_info) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return craftsman_user_model.findById(user_id);
        })
        .then((craftsman_user_info) => {
            let new_user_info_obj = {
                city: new_user_info.city,
                current_address: new_user_info.current_address,
                scientific_certificate: new_user_info.scientific_certificate,
                craftsmanship: new_user_info.craftsmanship,
                work_address: new_user_info.work_address,
                landline_number: new_user_info.landline_number,
                phone_number: new_user_info.phone_number,
                whatsapp_number: new_user_info.whatsapp_number,
                email: new_user_info.email,
                file_paths: new_user_info.file_paths,
            };
            craftsman_user_model.updateOne({ _id: user_id }, new_user_info_obj)
            .then(() => {
                mongoose.disconnect();
                resolve([craftsman_user_info.file_paths, new_user_info_obj]);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            })
        });
    });
}

module.exports = {
    create_craftsman_user_account,
    get_craftsman_user_info,
    update_craftsman_info
};