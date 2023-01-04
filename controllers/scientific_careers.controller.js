const scientific_careers_obj = require("../models/scientific_careers_obj.model");

const { handle_user_info, handle_delete_user_files, handle_delete_files } = require("../global/functions");

function post_scientific_careers_account(req, res) {
    let user_info = handle_user_info(req.files, req.body);
    scientific_careers_obj.create_scientific_careers_user_account(user_info).then(() => {
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

function get_scientific_career_info(req, res) {
    scientific_careers_obj.get_scientific_career_info(req.params.scientific_career_id).then(user_info => {
        res.json(user_info);
    }).catch(err => res.json(err));
}

function get_all_scientific_careers_users_info(req, res) {
    scientific_careers_obj.get_all_scientific_careers_users_info().then(scientific_careers_users_info_List => {
        res.json(scientific_careers_users_info_List);
    }).catch(err => res.json(err));
}

function put_scientific_career_info(req, res) {
    let new_user_info = handle_user_info(req.files, req.body);
    let scientific_career_id = req.params.scientific_career_id;
    scientific_careers_obj.update_scientific_career_info(scientific_career_id, new_user_info)
    .then(new_user_info_obj => {
        res.json(
            {
                _id: scientific_career_id,
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
    post_scientific_careers_account,
    get_scientific_career_info,
    put_scientific_career_info,
    get_all_scientific_careers_users_info
};