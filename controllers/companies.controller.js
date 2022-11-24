const companies_obj = require("../models/companies.model");

function post_company_account(req, res) {
    const user_info = {
        ...Object.assign({}, req.body),
        file_src1: req.files[0].path,
        file_src2: req.files[1].path
    };
    companies_obj.create_company_user_account(user_info).then(company_info => {
        // إعادة مُعرف الشركة من أجل الاستفادة منه في ربط الشريك بالشركة التي يُشارك بها
        res.json(company_info._id);
    })
    .catch(err => {
        // حذف الملفات في حالة وُجد خطأ في إنشاء الحساب
        const { unlinkSync } = require("fs");
        unlinkSync(req.files[0].path);
        unlinkSync(req.files[1].path);
        res.json(err);
    });
}

function get_company_info(req, res) {
    companies_obj.get_company_info(req.params.company_id).then(user_info => {
        res.json(user_info);
    }).catch(err => res.json(err));
}

function put_company_info(req, res) {
    let new_user_info = {
        ...Object.assign({}, req.body),
        file_src1: req.files[0].path,
        file_src2: req.files[1].path
    }
    companies_obj.update_company_info(req.params.company_id, new_user_info)
    .then(new_user_info_obj => {
        const { unlinkSync } = require("fs");
        unlinkSync(req.body.old_file_src1);
        unlinkSync(req.body.old_file_src2);
        res.json({_id: req.params.company_id, ...new_user_info_obj});
    })
    .catch(err => {
        const { unlinkSync } = require("fs");
        unlinkSync(req.files[0].path);
        unlinkSync(req.files[1].path);
        res.json(err);
    });
}

module.exports = {
    post_company_account,
    get_company_info,
    put_company_info
};