const companies_router = require("express").Router();

const companies_controller = require("../controllers/companies.controller");

const upload = require("../global/multer.module.config");

companies_router.post("/add-new-user", upload.any(), companies_controller.post_company_account);

companies_router.get("/company-user-info/:company_id", companies_controller.get_company_info);

companies_router.get("/all-compaines", companies_controller.get_all_companies);

companies_router.put("/update-company-user-info/:company_id", upload.any(), companies_controller.put_company_info);

module.exports = companies_router;