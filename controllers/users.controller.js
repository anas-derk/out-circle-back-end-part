const users_obj = require("../models/users.model");

const { send_code_to_user_email } = require("../controllers/emails.controller");

function get_login(req, res) {
    let input = req.query.input,
        password = req.query.password,
        user_type = req.query.user_type;
    users_obj.login(input, password, user_type).then((userInfo) => {
        res.json(userInfo);
    }).catch(err => res.json(err));
}

function put_user_password(req, res) {
    let user_id = req.params.user_id,
        old_password = req.query.old_password,
        new_password = req.query.new_password,
        user_type = req.query.user_type;
    users_obj.update_user_password(user_type, user_id, old_password, new_password).then(() => {
        res.json();
    }).catch(err => res.json(err));
}

function post_forget_password(req, res) {
    const email = req.query.email;
    // التأكد من أنّ الحساب موجود
    users_obj.is_user_account_exist(email)
    .then(user_info => {
        if (user_info) {
            // إذا كان الحساب موجوداً نقوم بإرسال الإيميل
            send_code_to_user_email(email)
            .then(generated_code => {
                // إرجاع البيانات المطلوبة لعملية إعادة ضبط كلمة السر
                res.json(
                    {
                        user_id: user_info._id,
                        account_type: user_info.account_type,
                        code: generated_code
                    }
                );
            })
            .catch(err => console.log(err));
        } else {
            res.json("عذراً، الحساب غير موجود ..");
        }
    })
    .catch(err => res.json(err));
}

function put_reset_user_password(req, res) {
    users_obj.reset_user_password(req.params.user_id, req.query.account_type, req.query.new_password)
    .then(() => {
        res.json();
    })
    .catch(err => res.json(err));
}

module.exports = {
    get_login,
    put_user_password,
    post_forget_password,
    put_reset_user_password
};