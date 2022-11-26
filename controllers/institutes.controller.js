const institutes_obj = require("../models/institutes.model");

const { handle_user_info_with_one_file } = require("../global/functions");

function post_institute_account(req, res) {
    let user_info = handle_user_info_with_one_file(req.file, req.body);
    institutes_obj.create_institute_user_account(user_info).then(() => {
        res.json({});
    }).catch(err => {
        if (err === "عذراً البريد الالكتروني الذي أدخلته موجود مسبقاً ،  من فضلك أدخل بريد الكتروني آخر ...") {
            // حذف الملف في حالة وُجد خطأ في إنشاء الحساب
            const { unlinkSync } = require("fs");
            unlinkSync(req.file.path);
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

function put_institute_info(req, res) {
    let new_user_info = handle_user_info_with_one_file(req.file, req.body);
    let institute_id = req.params.institute_id;
    institutes_obj.update_institute_info(institute_id, new_user_info)
    .then(result_list => {
        const { unlinkSync } = require("fs");
        unlinkSync(result_list[0]);
        res.json(
            {
                _id: institute_id,
                ...result_list[1]
            }
        );
    })
    .catch(err => {
        const { unlinkSync } = require("fs");
        unlinkSync(req.file.path);
        res.json(err);
    });
}

module.exports = {
    post_institute_account,
    get_institute_info,
    put_institute_info
};