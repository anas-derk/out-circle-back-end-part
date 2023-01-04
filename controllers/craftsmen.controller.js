const craftsmen_obj = require("../models/craftsmen.model");

const { handle_user_info, handle_delete_user_files, handle_delete_files } = require("../global/functions");

function post_craftsman_account(req, res) {
    let user_info = handle_user_info(req.files, req.body);
    craftsmen_obj.create_craftsman_user_account(user_info).then(() => {
        res.json({});
    })
    .catch(err => {
        if (err === "عذراً البريد الالكتروني الذي أدخلته موجود مسبقاً ،  من فضلك أدخل بريد الكتروني آخر ...") {
            // حذف الملفات في حالة وُجد خطأ في إنشاء الحساب
            handle_delete_user_files(req.files);
        }
        res.json(err);
    });
}

function get_craftsman_user_info(req, res) {
    craftsmen_obj.get_craftsman_user_info(req.params.craftsman_id).then(user_info => {
        res.json(user_info);
    }).catch(err => res.json(err));
}

function get_all_craftsmen_users_info(req, res) {
    craftsmen_obj.get_all_craftsmen_users_info().then(craftsmen_users_info_List => {
        res.json(craftsmen_users_info_List);
    }).catch(err => res.json(err));
}

function put_craftsman_info(req, res) {
    let new_user_info = handle_user_info(req.files, req.body);
    let craftsman_id = req.params.craftsman_id;
    craftsmen_obj.update_craftsman_info(craftsman_id, new_user_info)
    .then(new_user_info_obj => {
        // إرجاع بيانات المستخدم الجديدة مع إضافة المُعرف
        res.json(
            {
                _id: craftsman_id,
                ...new_user_info_obj
            }
        );
    })
    .catch(err => {
        handle_delete_user_files(req.files);
        res.json(err);
    });
}

module.exports = {
    post_craftsman_account,
    get_craftsman_user_info,
    put_craftsman_info,
    get_all_craftsmen_users_info,
};