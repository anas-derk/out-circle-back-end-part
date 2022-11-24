// import mongoose module for manipulate with mongo database

const mongoose = require("mongoose");

// import Database Url

const DB_URL = require("./DB_URL");

// create Partner User Schema For Partner User Model

const partner_user_schema = mongoose.Schema({
    full_name: String,
    birthday: Date,
    phone_number: Number,
    whatsapp_number: Number,
    land_phone_extension: Number,
    email: String,
    participation_rate: Number,
    company_id: String,
});

// create partner User Model In Database

const partner_user_model = mongoose.model("partner", partner_user_schema);

// define create new partner user account function

function is_partner_user_account_exist(user_info) {
    // معرفة هل بيانات المشارك موجودة مسبقاً 
    // في حالة كانت موجودة نعيد true .
    // في حالة غير موجودة في أي جدول من جداول قاعدة البيانات نعيد false
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return partner_user_model.findOne({ email: user_info.email });
        })
        .then((user) => {
            if (user) {
                mongoose.disconnect();
                resolve(true);
            } else {
                return mongoose.models.individual.findOne({ email: user_info.email });
            }
        })
        .then((user) => {
            if (user) {
                mongoose.disconnect();
                resolve(true);
            } else {
                return mongoose.models.companie.findOne({ email: user_info.email });
            }
        })
        .then((user) => {
            if (user) {
                mongoose.disconnect();
                resolve(true);
            } else {
                return mongoose.models.craftsman.findOne({ email: user_info.email });
            }
        })
        .then((user) => {
            if (user) {
                mongoose.disconnect();
                resolve(true);
            } else {
                return mongoose.models.institute.findOne({ email: user_info.email });
            }
        })
        .then((user) => {
            if (user) {
                mongoose.disconnect();
                resolve(true);
            } else {
                return mongoose.models.scientific_career.findOne({ email: user_info.email });
            }
        })
        .then((user) => {
            if (user) {
                mongoose.disconnect();
                resolve(true);
            } else {
                mongoose.disconnect();
                resolve(false);
            }
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        });
    });
}

function insert_partners_info(users_info) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return partner_user_model.insertMany(users_info);
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

function get_partners_info(company_id) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return partner_user_model.find({ company_id });
        })
        .then((partners_info) => {
            mongoose.disconnect();
            resolve(partners_info);
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        });
    });
}

function update_partner_info(partner_id, new_partner_info) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return partner_user_model.updateOne({ _id: partner_id },
                {
                    full_name: new_partner_info.full_name,
                    birthday: new_partner_info.birthday,
                    phone_number: new_partner_info.phone_number,
                    whatsapp_number: new_partner_info.whatsapp_number,
                    land_phone_extension: new_partner_info.land_phone_extension,
                    email: new_partner_info.email,
                    participation_rate: new_partner_info.participation_rate,
                }
            );
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

module.exports = {
    is_partner_user_account_exist,
    insert_partners_info,
    get_partners_info,
    update_partner_info
};