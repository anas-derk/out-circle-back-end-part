// import mongoose module for manipulate with mongo database

const mongoose = require("mongoose");

// import Database Url

const DB_URL = require("./DB_URL");

// create Individual User Schema For Individual User Model

const individual_user_schema = mongoose.Schema({
    user_name: String,
    password: String,
    full_name: String,
    birthday: Date,
    city: String,
    current_address: String,
    scientific_certificate: String,
    scientific_certificate_details: String,
    phone_number: Number,
    whatsapp_number: Number,
    email: String,
    current_work: String,
    work_address: String,
    work_start_date: Date,
    business_phone_number: Number,
    shunt: Number,
    scientific_experience_details: String,
    language_skills: String,
    technical_skills: String,
    file_paths: [],
    account_type: {
        default: "individual",
        type: String
    }
});

// create Individual User Model In Database

const individual_user_model = mongoose.model("individual", individual_user_schema);

// require bcryptjs module for password encrypting

const bcrypt = require("bcryptjs");

// define create new individual user account function

function create_individual_user_account(userInfo) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return individual_user_model.findOne({ email: userInfo.email });
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
            let new_individual_user = new individual_user_model(userInfo);
            return new_individual_user.save();
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

function get_individual_user_info(individual_user_id) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return individual_user_model.findById(individual_user_id);
        })
        .then(individual_user_info => {
            mongoose.disconnect();
            resolve(individual_user_info);
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        });
    });
}

function update_individual_user_info(individual_user_id, new_user_info) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return individual_user_model.findById(individual_user_id);
        })
        .then((individual_user_info) => {
            let new_user_info_obj = {
                city: new_user_info.city,
                current_address: new_user_info.current_address,
                scientific_certificate: new_user_info.scientific_certificate,
                scientific_certificate_details: new_user_info.scientific_certificate_details,
                phone_number: new_user_info.phone_number,
                whatsapp_number: new_user_info.whatsapp_number,
                email: new_user_info.email,
                current_work: new_user_info.current_address,
                work_address: new_user_info.work_address,
                work_start_date: new_user_info.work_start_date,
                business_phone_number: new_user_info.business_phone_number,
                shunt: new_user_info.shunt,
                scientific_experience_details: new_user_info.scientific_experience_details,
                language_skills: new_user_info.language_skills,
                technical_skills: new_user_info.technical_skills,
                file_paths: new_user_info.file_paths,
            };
            // Alter The Determinate Individual User Data In Database
            individual_user_model.updateOne({ _id: individual_user_id }, new_user_info_obj)
            .then(() => {
                mongoose.disconnect();
                resolve([individual_user_info.file_paths, new_user_info_obj]);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            })
        });
    });
}

module.exports = {
    create_individual_user_account,
    get_individual_user_info,
    update_individual_user_info
};