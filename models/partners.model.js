// import mongoose module for manipulate with mongo database

const mongoose = require("mongoose");

// import Database Url

const DB_URL = require("./DB_URL");

// create Partner User Schema For Partner User Model

const partner_user_schema = mongoose.Schema({
    full_name: String,
    birthday: String,
    phone_number: String,
    whatsapp_number: String,
    land_phone_extension: String,
    email: String,
    participation_rate: String,
    company_id: String,
});

// create partner User Model In Database

const partner_user_model = mongoose.model("partner", partner_user_schema);

// define create new partner user account function

function is_partner_user_account_exist(email) {
    // معرفة هل بيانات المشارك موجودة مسبقاً 
    // في حالة كانت موجودة نعيد true .
    // في حالة غير موجودة في أي جدول من جداول قاعدة البيانات نعيد false
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return partner_user_model.findOne({ email });
        })
        .then((user) => {
            if (user) {
                mongoose.disconnect();
                resolve(true);
            } else {
                return mongoose.models.individual.findOne({ email });
            }
        })
        .then((user) => {
            if (user) {
                mongoose.disconnect();
                resolve(true);
            } else {
                return mongoose.models.companie.findOne({ email });
            }
        })
        .then((user) => {
            if (user) {
                mongoose.disconnect();
                resolve(true);
            } else {
                return mongoose.models.craftsman.findOne({ email });
            }
        })
        .then((user) => {
            if (user) {
                mongoose.disconnect();
                resolve(true);
            } else {
                return mongoose.models.institute.findOne({ email });
            }
        })
        .then((user) => {
            if (user) {
                mongoose.disconnect();
                resolve(true);
            } else {
                return mongoose.models.scientific_career.findOne({ email });
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

function add_new_partners_info(users_info, company_id, number_of_new_partners) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return partner_user_model.insertMany(users_info);
        })
        .then(() => {
            return mongoose.models.companie.findById({_id: company_id})
        })
        .then((companyInfo) => {
            return mongoose.models.companie.updateOne({ _id: company_id }, { number_of_partners: Number(companyInfo.number_of_partners) + Number(number_of_new_partners) })
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

function delete_partner(partner_id, company_id) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return partner_user_model.deleteOne({ _id: partner_id });
        })
        .then(() => {
            return mongoose.models.companie.findById({_id: company_id})
        })
        .then((companyInfo) => {
            return mongoose.models.companie.updateOne({ _id: company_id }, { number_of_partners: Number(companyInfo.number_of_partners) - 1 })
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
    update_partner_info,
    delete_partner,
    add_new_partners_info
};