const scientific_careers_obj = require("../models/scientific_careers_obj.model");

function post_scientific_careers_account(req, res) {
    const user_info = {
        ...Object.assign({}, req.body),
        file_src: req.file.path,
    }
    scientific_careers_obj.create_scientific_careers_user_account(user_info).then(() => {
        res.json({});
    })
    .catch(err => {
        // حذف الملف في حالة وُجد خطأ في إنشاء الحساب
        const { unlinkSync } = require("fs");
        unlinkSync(req.file.path);
        res.json(err);
    });
}

function get_scientific_career_info(req, res) {
    scientific_careers_obj.get_scientific_career_info(req.params.scientific_career_id).then(user_info => {
        res.json(user_info);
    }).catch(err => res.json(err));
}

function put_scientific_career_info(req, res) {
    let user_info = {
        ...Object.assign({}, req.body),
        file_src: req.file.path,
    }
    scientific_careers_obj.update_scientific_career_info(req.params.scientific_career_id, user_info)
    .then(new_user_info_obj => {
        const { unlinkSync } = require("fs");
        unlinkSync(req.body.old_file_src);
        res.json({_id: req.params.scientific_career_id, ...new_user_info_obj});
    })
    .catch(err => {
        const { unlinkSync } = require("fs");
        unlinkSync(req.file.path);
        res.json(err);
    });
}

module.exports = {
    post_scientific_careers_account,
    get_scientific_career_info,
    put_scientific_career_info
};