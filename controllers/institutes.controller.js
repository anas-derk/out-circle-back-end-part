const institutes_obj = require("../models/institutes.model");

const { handle_user_info, handle_delete_user_files, handle_delete_files } = require("../global/functions");

function post_institute_account(req, res) {
    let user_info = handle_user_info(req.files, req.body);
    institutes_obj.create_institute_user_account(user_info).then(() => {
        res.json({});
    }).catch(err => {
        if (err === "عذراً البريد الالكتروني الذي أدخلته موجود مسبقاً ،  من فضلك أدخل بريد الكتروني آخر ...") {
            // حذف الملفات في حالة وُجد خطأ في إنشاء الحساب
            handle_delete_user_files(req.files);
        }
        res.json(err);
    });
}

function get_institute_info(req, res) {
    institutes_obj.get_institute_info(req.params.institute_id).then(user_info => {
        res.json(user_info);
    })
    .catch(err => {
        res.json(err);
    });
}

function get_all_institutes_info(req, res) {
    institutes_obj.get_all_institutes_info().then(institutes_info_List => {
        res.json(institutes_info_List);
    }).catch(err => res.json(err));
}

function put_institute_info(req, res) {
    let new_user_info = handle_user_info(req.files, req.body);
    let institute_id = req.params.institute_id;
    institutes_obj.update_institute_info(institute_id, new_user_info)
    .then(new_user_info_obj => {
        res.json(
            {
                _id: institute_id,
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
    post_institute_account,
    get_institute_info,
    put_institute_info,
    get_all_institutes_info
};