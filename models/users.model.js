// import mongoose module for manipulate with mongo database

const mongoose = require("mongoose");

// import Database Url

const DB_URL = require("./DB_URL");

// require bcryptjs module for password encrypting

const bcrypt = require("bcryptjs");

// define login function

function login(input, password, user_type) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
            .then(() => {
                // " البحث بناءً على نوع المستخدم المُدخل من أجل تسريع عملية البحث: "عدم البحث في كل الجداول
                switch(user_type){
                    case "individuals": {
                        // البحث عن طريق الإيميل إذا كان المُدخل هو بريد الكتروني
                        if (input.includes("@"))
                            return mongoose.models.individual.findOne({ email: input });
                        // البحث عن طريق رقم الهاتف إذا كان المُدخل هو رقم هاتف
                        return mongoose.models.individual.findOne({ phone_number: input });
                    }
                    case "companies": {
                        if (input.includes("@"))
                            return mongoose.models.companie.findOne({ email: input });
                        return mongoose.models.companie.findOne({ phone_number: input });
                    }
                    case "craftsmen": {
                        if (input.includes("@"))
                            return mongoose.models.craftsman.findOne({ email: input });
                        return mongoose.models.craftsman.findOne({ phone_number: input });
                    }
                    case "institutes": {
                        if (input.includes("@"))
                            return mongoose.models.institute.findOne({ email: input });
                        return mongoose.models.institute.findOne({ phone_number: input });
                    }
                    case "scientific_careers": {
                        if (input.includes("@"))
                            return mongoose.models.scientific_career.findOne({ email: input });
                        return mongoose.models.scientific_career.findOne({ phone_number: input });
                    }
                    default: {
                        mongoose.disconnect();
                        reject("Error !!!");
                    }
                }
            })
            .then(user => {
                if (!user) {
                    mongoose.disconnect();
                    reject("عذراً الحساب الذي ادخلته غير موجود ، رجاءً أدخل إيميل آخر من فضلك ...");
                } else {
                    // التأكد من كون كلمة السر المُدخلة مطابقة لكلمة السر المشفرة في قاعدة البيانات
                    // ملاحظة : بعد تشفير كلمة السر المدخلة
                    bcrypt.compare(password, user.password).then(passwordIsTrue => {
                        switch (passwordIsTrue) {
                            case true: {
                                // في حالة كانت الكلمتان متطابقتان نقوم بإرجاع بيانات الحساب
                                mongoose.disconnect();
                                resolve(user);
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
// دالة لتعديل كلمة السر لحساب موجود وقد قام بتسجيل الدخول
function update_user_password(user_type, user_id, old_password, new_password) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
            .then(() => {
                // البحث عن الحساب إن كان موجوداً أولاً أم لا حسب نوع المستخدم من أجل تسريع عملية البحث
                switch(user_type){
                    case "individual": {
                        return mongoose.models.individual.findById(user_id);
                    }
                    case "company": {
                        return mongoose.models.companie.findById(user_id);
                    }
                    case "craftsman": {
                        return mongoose.models.craftsman.findById(user_id);
                    }
                    case "institute": {
                        return mongoose.models.institute.findById(user_id);
                    }
                    case "scientific_career": {
                        return mongoose.models.scientific_career.findById(user_id);
                    }
                    default: {
                        mongoose.disconnect();
                        reject("Error !!!");
                    }
                }
            })
            .then(user => {
                // إذا كان الحساب غير موجود أصلاً نُعيد خطأ
                if (!user) {
                    mongoose.disconnect();
                    reject("عذراً الحساب غير موجود ...");
                } else {
                    // إذا كان الحساب موجود مسبفاً ، نقارن كلمة السر القديمة المدخلة مع كلمة السر القديمة الموجودة في بيانات المستخدم في قاعدة البيانات 
                    bcrypt.compare(old_password, user.password).then(passwordIsTrue => {
                        switch (passwordIsTrue) {
                            case true: {
                                // إذا كانت كلمة السر المدخلة صحيحة ، نقوم بتشفير كلمة السر الجديدة
                                return bcrypt.hash(new_password, 10);
                            }
                            default: {
                                // إذا لم تكن كلمة السر المدخلة صحيحة ، نُعيد خطأ
                                mongoose.disconnect();
                                reject("كلمة السر التي أدخلتها غير صحيحة ، من فضلك أعد إدخال كلمة السر القديمة بشكل صحيح ..");
                            }
                        }
                    })
                    .then(encrypted_password => {
                        // نبحث عن المستخدم المطلوب حسب نوع الحساب المدخل لتسريع عملية البحث ، ثمّ نستبدل كلمة السر القديمة بالكلمة الجديدة المدخلة
                        switch(user_type){
                            case "individual": {
                                // Change User Password After Encrypting it
                                return mongoose.models.individual.updateOne({ email: user.email }, { password: encrypted_password });
                            }
                            case "company": {
                                return mongoose.models.companie.updateOne({ email: user.email }, { password: encrypted_password });
                            }
                            case "craftsman": {
                                return mongoose.models.craftsman.updateOne({ email: user.email }, { password: encrypted_password });
                            }
                            case "institute": {
                                return mongoose.models.institute.updateOne({ email: user.email }, { password: encrypted_password });
                            }
                            case "scientific_career": {
                                return mongoose.models.scientific_career.updateOne({ email: user.email }, { password: encrypted_password });
                            }
                            default: {
                                mongoose.disconnect();
                                reject("Error !!!");
                            }
                        }
                    })
                    .then(() => {
                        mongoose.disconnect();
                        resolve();
                    })
                    .catch(err => {
                        mongoose.disconnect();
                        reject(err);
                    });
                }
            });
    });
}

function is_user_account_exist(email) {
    // البحث عن حساب مستخدم إن كان موجوداً في قاعدة البيانات
    // في حالة كان موجوداً نقوم بإرجاع بياناته ونتوقف عن عملية البحث
    // في حالة لم يكن موجوداً نقوم بإرجاع false
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return mongoose.models.individual.findOne({ email});
        })
        .then((user) => {
            if (user) {
                mongoose.disconnect();
                resolve(user);
            } else {
                return mongoose.models.companie.findOne({ email });
            }
        })
        .then((user) => {
            if (user) {
                mongoose.disconnect();
                resolve(user);
            } else {
                return mongoose.models.craftsman.findOne({ email });
            }
        })
        .then((user) => {
            if (user) {
                mongoose.disconnect();
                resolve(user);
            } else {
                return mongoose.models.institute.findOne({ email });
            }
        })
        .then((user) => {
            if (user) {
                mongoose.disconnect();
                resolve(user);
            } else {
                return mongoose.models.scientific_career.findOne({ email });
            }
        })
        .then((user) => {
            if (user) {
                mongoose.disconnect();
                resolve(user);
            } else {
                return mongoose.models.partner.findOne({ email });
            }
        })
        .then((user) => {
            if (user) {
                mongoose.disconnect();
                resolve(user);
            } else {
                mongoose.disconnect();
                resolve(false);
            }
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    });
}

// دالة لإعادة تعيين كلمة السر
function reset_user_password(user_id, account_type, new_password) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            // تشفير كلمة السر الجديدة
            return bcrypt.hash(new_password, 10);
        })
        .then(encrypted_password => {
            // تعديل كلمة السر للحساب المرتبط بالمُعرف في الجدول الموجود فيه : حسب نوع الحساب المُدخل
            // من أجل تسريع عملية التعديل بدلاً من البحث في كل الجداول ثمّ إعادة تعيين كلمة السر
            switch(account_type){
                case "individual": {
                    // Change User Password After Encrypting it
                    return mongoose.models.individual.updateOne({ _id: user_id }, { password: encrypted_password });
                }
                case "company": {
                    return mongoose.models.companie.updateOne({ _id: user_id }, { password: encrypted_password });
                }
                case "craftsman": {
                    return mongoose.models.craftsman.updateOne({ _id: user_id }, { password: encrypted_password });
                }
                case "institute": {
                    return mongoose.models.institute.updateOne({ _id: user_id }, { password: encrypted_password });
                }
                case "scientific_career": {
                    return mongoose.models.scientific_career.updateOne({ _id: user_id }, { password: encrypted_password });
                }
                default: {
                    mongoose.disconnect();
                    reject("Error !!!");
                }
            }
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
    login,
    update_user_password,
    is_user_account_exist,
    reset_user_password
};