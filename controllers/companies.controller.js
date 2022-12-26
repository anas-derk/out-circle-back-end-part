const companies_obj = require("../models/companies.model");

const { handle_user_info, handle_delete_user_files, handle_delete_files } = require("../global/functions");

function post_company_account(req, res) {
    let user_info = handle_user_info(req.files, req.body);
    companies_obj.create_company_user_account(user_info).then(company_info => {
        // إعادة مُعرف الشركة من أجل الاستفادة منه في ربط الشريك بالشركة التي يُشارك بها
        res.json(company_info._id);
    })
    .catch(err => {
        if (
            err === "عذراً البريد الالكتروني الذي أدخلته موجود مسبقاً ،  من فضلك أدخل بريد الكتروني آخر ..." ||
            err === "عذراً ، توجد شركة تحمل نفس رقم السجل ، الرجاء إدخال رقم سجل آخر ..."
        ) {
            // حذف الملفات في حالة وُجد خطأ في إنشاء الحساب
            handle_delete_user_files(req.files);
        }
        res.json(err);
    });
}

function get_company_info(req, res) {
    companies_obj.get_company_info(req.params.company_id).then(user_info => {
        res.json(user_info);
    }).catch(err => res.json(err));
}

function put_company_info(req, res) {
    let new_user_info = handle_user_info(req.files, req.body);
    let company_id = req.params.company_id;
    companies_obj.update_company_info(company_id, new_user_info)
    .then(result_list => {
        handle_delete_files(result_list[0]);
        res.json(
            {
                _id: company_id,
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
    post_company_account,
    get_company_info,
    put_company_info
};