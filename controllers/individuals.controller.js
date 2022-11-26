const individuals_obj = require("../models/individuals.model");

const { handle_user_info, handle_delete_user_files, handle_delete_files } = require("../global/functions");

function post_individual_account(req, res) {
    let user_info = handle_user_info(req.files, req.body);
    individuals_obj.create_individual_user_account(user_info).then(() => {
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

function get_individual_user_info(req, res) {
    individuals_obj.get_individual_user_info(req.params.individual_user_id).then(user_info => {
        res.json(user_info);
    }).catch(err => res.json(err));
}

function put_individual_user_info(req, res) {
    let new_user_info = handle_user_info(req.files, req.body);
    let individual_user_id = req.params.individual_user_id;
    individuals_obj.update_individual_user_info(individual_user_id, new_user_info)
    .then(result_list => {
        handle_delete_files(result_list[0]);
        // إرجاع بيانات المستخدم الجديدة مع إضافة المُعرف
        res.json(
            {
                _id: individual_user_id,
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
    post_individual_account,
    get_individual_user_info,
    put_individual_user_info
};