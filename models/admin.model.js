// import mongoose module for manipulate with mongo database

const mongoose = require("mongoose");

// import Database Url

const DB_URL = require("./DB_URL");

// create Admin User Schema For Admin User Model

const admin_user_schema = mongoose.Schema({
    email: String,
    password: String,
});

// create Admin User Model In Database

const admin_user_model = mongoose.model("admin", admin_user_schema);

// require bcryptjs module for password encrypting

const bcrypt = require("bcryptjs");

// define create new admin user account function

function create_admin_user_account(userInfo) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return admin_user_model.findOne({ email: userInfo.email });
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
            let new_admin_user = new admin_user_model(userInfo);
            return new_admin_user.save();
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

// define admin login function

function admin_login(userInfo) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
            .then(() => {
                return admin_user_model.findOne({ email: userInfo.email });
            })
            .then(user => {
                if (!user) {
                    mongoose.disconnect();
                    reject("عذراً الحساب الذي ادخلته غير موجود ، رجاءً أدخل إيميل آخر من فضلك ...");
                } else {
                    // التأكد من كون كلمة السر المُدخلة مطابقة لكلمة السر المشفرة في قاعدة البيانات
                    // ملاحظة : بعد تشفير كلمة السر المدخلة
                    bcrypt.compare(userInfo.password, user.password).then(passwordIsTrue => {
                        switch (passwordIsTrue) {
                            case true: {
                                // في حالة كانت الكلمتان متطابقتان نقوم بإرجاع بيانات الحساب
                                mongoose.disconnect();
                                resolve();
                            }
                            default: {
                                // في حالة عكس ذلك نقوم بإرجاع خطأ
                                mongoose.disconnect();
                                reject("كلمة السر التي أدخلتها غير صحيحة ، من فضلك أعد إدخال كلمة السر بشكل صحيح ..");
                            }
                        }
                    });
                }
            })
            .catch((err) => {
                // في حالة حدث أي خطأ أثناء عملية تسجيل الدخول نقوم بإرجاع خطأ
                mongoose.disconnect();
                reject(err);
            });
    });
}

module.exports = {
    create_admin_user_account,
    admin_login
}