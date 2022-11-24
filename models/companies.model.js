// import mongoose module for manipulate with mongo database

const mongoose = require("mongoose");

// import Database Url

const DB_URL = require("./DB_URL");

// create Company User Schema For Company User Model

const company_user_schema = mongoose.Schema({
    user_name: String,
    password: String,
    company_name: String,
    company_type: String,
    company_record_number: Number,
    company_record_history: String,
    city: String,
    current_address: String,
    current_company_activity_details: String,
    email: String,
    phone_number: Number,
    work_start_date: Date,
    landline_number: Number,
    fax_number: Number,
    number_of_partners: String,
    file_src1: String,
    file_src2: String,
    // هذا المفتاح يُضاف تلقائياً إلى بيانات الجدول من أجل تسريع عملية تعديل البيانات
    account_type: {
        default: "company",
        type: String
    }
});

// create company User Model In Database

const company_user_model = mongoose.model("companie", company_user_schema);

// require bcryptjs module for password encrypting

const bcrypt = require("bcryptjs");

// define create new company user account function

function create_company_user_account(userInfo) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            // التأكد من أنّ الحساب موجود أم لا في جدول الشركات
            return company_user_model.findOne({ email: userInfo.email });
        })
        .then((user) => {
            if (user) {
                // إذا كان الحساب موجود مسبقاً فإننا نقوم بإرجاع رسالة خطأ
                mongoose.disconnect();
                reject("عذراً البريد الالكتروني الذي أدخلته موجود مسبقاً ،  من فضلك أدخل بريد الكتروني آخر ...")
            } else {
                // في حالة الحساب غير موجود حسب البريد الالكتروني نبحث عنه من خلال رقم السجل الخاص بالشركة
                return company_user_model.findOne({ company_record_number: userInfo.company_record_number });
            }
        })
        .then((user) => {
            if (user) {
                // في حالة الحساب موجود مسبقاً بناءً على رقم السجل نُرجع خطأ
                mongoose.disconnect();
                reject("عذراً ، توجد شركة تحمل نفس رقم السجل ، الرجاء إدخال رقم سجل آخر ...");
            } else {
                // إذا لم يكن الحساب موجوداً في جدول بيانات الشركات في قاعدة البيانات حسب الإيميل أو رقم السجل فإننا نبحث في باقي الجداول حسب الإيميل
                return mongoose.models.individual.findOne({ email: userInfo.email });
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
                // إذا لم نجد الحساب في أي جدول في قاعدة البيانات فإننا نقوم بتشفير كلمة السر قبل حفظه في قاعدة البيانات
                let password = userInfo.password;
                return bcrypt.hash(password, 10);
            }
        })
        .then(encrypted_password => {
            // استبدال كلمة السر الموجودة في الكائن بكلمة السر المشفرّة
            userInfo.password = encrypted_password;
            // حفظ بيانات الحساب في قاعدة البيانات
            let new_company_user = new company_user_model(userInfo);
            return new_company_user.save();
        })
        .then(() => {
            // إرجاع بيانات الحساب من أجل الاستفادة منها لاحقاً
            return company_user_model.findOne({ email: userInfo.email });
        })
        .then(user => {
            mongoose.disconnect();
            resolve(user);
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        });
    });
}

// دالة خاصة بإرجاع بيانات الشركة
function get_company_info(company_id) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return company_user_model.findById(company_id);
        })
        .then(company_info => {
            mongoose.disconnect();
            resolve(company_info);
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        });
    });
}

function update_company_info(user_id, new_user_info) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            // إنشاء كائن خاص بالبيانات الجديدة كي لا يتم حذف المعرّف عند التعديل
            let new_user_info_obj = {
                company_name: new_user_info.company_name,
                company_type: new_user_info.company_type,
                city: new_user_info.city,
                current_address: new_user_info.current_address,
                current_company_activity_details: new_user_info.current_company_activity_details,
                email: new_user_info.email,
                phone_number: new_user_info.phone_number,
                landline_number: new_user_info.landline_number,
                fax_number: new_user_info.fax_number,
                number_of_partners: new_user_info.number_of_partners,
                file_src1: new_user_info.file_src1,
                file_src2: new_user_info.file_src2,
            };
            company_user_model.updateOne({ _id: user_id }, new_user_info_obj)
            .then(() => {
                mongoose.disconnect();
                // إرجاع البيانات المعدلة من أجل حفظها في مكان ما للاستفادة منها لاحقاً
                resolve(new_user_info_obj);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            })
        });
    });
}

module.exports = {
    create_company_user_account,
    get_company_info,
    update_company_info
};