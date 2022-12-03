const partners_router = require("express").Router();

const partners_controller = require("../controllers/partners.controller");

partners_router.get("/is-partner-user-account-exist", partners_controller.is_partner_user_account_exist);

partners_router.post("/add-new-partner", partners_controller.post_partners);

partners_router.get("/partner-user-info/:company_id", partners_controller.get_partners_info);

partners_router.put("/update-partner-info/:partner_id", partners_controller.put_partner_info);

module.exports = partners_router;