const craftsmen_obj = require("../models/craftsmen.model");

const { handle_user_info, handle_delete_user_files } = require("../global/functions");

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

function put_craftsman_info(req, res) {
    let new_user_info = handle_user_info(req.files, req.body);
    let craftsman_id = req.params.craftsman_id;
    craftsmen_obj.update_craftsman_info(craftsman_id, new_user_info)
    .then(result_list => {
        let file_paths = result_list[0];
        if (file_paths.length > 0) {
            const { unlinkSync } = require("fs");
            for(let i = 0; i < file_paths.length; i++) {
                unlinkSync(file_paths[i]);
            }
        }
        // إرجاع بيانات المستخدم الجديدة مع إضافة المُعرف
        res.json(
            {
                _id: craftsman_id,
                ...result_list[1]
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
    put_craftsman_info
};