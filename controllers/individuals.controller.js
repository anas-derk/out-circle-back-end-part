const individuals_obj = require("../models/individuals.model");

function post_individual_account(req, res) {
    const user_info = {
        ...Object.assign({}, req.body),
        file_src1: req.files[0].path,
        file_src2: req.files[1].path
    };
    individuals_obj.create_individual_user_account(user_info).then(() => {
        res.json();
    })
    .catch(err => {
        // حذف الملفات في حالة وُجد خطأ في إنشاء الحساب
        const { unlinkSync } = require("fs");
        unlinkSync(req.files[0].path);
        unlinkSync(req.files[1].path);
        res.json(err);
    });
}

function get_individual_user_info(req, res) {
    individuals_obj.get_individual_user_info(req.params.individual_user_id).then(user_info => {
        res.json(user_info);
    }).catch(err => res.json(err));
}

function put_individual_user_info(req, res) {
    let new_user_info = {
        ...Object.assign({}, req.body),
        file_src1: req.files[0].path,
        file_src2: req.files[1].path
    }
    individuals_obj.update_individual_user_info(req.params.individual_user_id, new_user_info)
    .then(new_user_info_obj => {
        const { unlinkSync } = require("fs");
        unlinkSync(req.body.old_file_src1);
        unlinkSync(req.body.old_file_src2);
        res.json({_id: req.params.individual_user_id, ...new_user_info_obj});
    })
    .catch(err => {
        const { unlinkSync } = require("fs");
        unlinkSync(req.files[0].path);
        unlinkSync(req.files[1].path);
        res.json(err);
    });
}

module.exports = {
    post_individual_account,
    get_individual_user_info,
    put_individual_user_info
};