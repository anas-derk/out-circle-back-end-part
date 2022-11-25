const institutes_obj = require("../models/institutes.model");

function post_institute_account(req, res) {
    const user_info = {
        ...Object.assign({}, req.body),
        file_src: req.file.path,
    };
    institutes_obj.create_institute_user_account(user_info).then(() => {
        res.json({});
    }).catch(err => {
        // حذف الملف في حالة وُجد خطأ في إنشاء الحساب
        const { unlinkSync } = require("fs");
        unlinkSync(req.file.path);
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
    let new_user_info = {
        ...Object.assign({}, req.body),
        file_src: req.file.path,
    }
    institutes_obj.update_institute_info(req.params.institute_id, new_user_info)
    .then(new_user_info_obj => {
        const { unlinkSync } = require("fs");
        unlinkSync(req.body.old_file_src);
        res.json({_id: req.params.institute_id, ...new_user_info_obj});
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