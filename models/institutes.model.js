// import mongoose module for manipulate with mongo database

const mongoose = require("mongoose");

// import Database Url

const DB_URL = require("./DB_URL");

// create institute User Schema For institute User Model

const institute_user_schema = mongoose.Schema({
    user_name: String,
    password: String,
    full_name: String,
    birthday: String,
    phone_number: String,
    whatsapp_number: String,
    user_email: String,
    institute_name: String,
    institute_record_number: String,
    institute_record_history: String,
    city: String,
    current_address: String,
    current_institute_activity_details: String,
    email: String,
    work_start_date: String,
    landline_number: String,
    fax_number: String,
    land_phone_extension: String,
    file_paths: Array,
    account_type: {
        default: "institute",
        type: String
    }
});

// create institute User Model In Database

const institute_user_model = mongoose.model("institute", institute_user_schema);

// require bcryptjs module for password encrypting

const bcrypt = require("bcryptjs");

// define create new institute user account function

function create_institute_user_account(userInfo) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return institute_user_model.findOne({ email: userInfo.email });
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
                return mongoose.models.individual.findOne({ email: userInfo.email });
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
            let new_institute_user = new institute_user_model(userInfo);
            return new_institute_user.save();
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

function get_institute_info(institute_id) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return institute_user_model.findById(institute_id);
        })
        .then(institute_info => {
            mongoose.disconnect();
            resolve(institute_info);
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        });
    });
}

function get_all_institutes_info() {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return institute_user_model.find();
        })
        .then((institutes_info_List) => {
            mongoose.disconnect();
            resolve(institutes_info_List);
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        });
    });
}

function update_institute_info(institute_id, new_user_info) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return institute_user_model.findById(institute_id);
        })
        .then((institute_info) => {
            let new_user_info_obj = {
                phone_number: new_user_info.phone_number,
                whatsapp_number: new_user_info.whatsapp_number,
                email: new_user_info.email,
                institute_name: new_user_info.institute_name,
                city: new_user_info.city,
                current_address: new_user_info.current_address,
                current_institute_activity_details: new_user_info.current_institute_activity_details,
                institute_email: new_user_info.institute_email,
                landline_number: new_user_info.landline_number,
                fax_number: new_user_info.fax_number,
                land_phone_extension: new_user_info.land_phone_extension,
                file_paths: new_user_info.file_paths,
            };
            institute_user_model.updateOne({ _id: institute_id }, new_user_info_obj)
            .then(() => {
                mongoose.disconnect();
                resolve([institute_info.file_paths, new_user_info]);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}

module.exports = {
    create_institute_user_account,
    get_institute_info,
    update_institute_info,
    get_all_institutes_info
};