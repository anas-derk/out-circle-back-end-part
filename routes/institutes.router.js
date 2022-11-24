const institutes_router = require("express").Router();

const institutes_controller = require("../controllers/institutes.controller");

const upload = require("../global/multer.module.config");

institutes_router.post("/add-new-user", upload.single("user_file"), institutes_controller.post_institute_account);

institutes_router.get("/institute-user-info/:institute_id", institutes_controller.get_institute_info);

institutes_router.put("/update-institute-user-info/:institute_id", upload.single("user_file"), institutes_controller.put_institute_info);

module.exports = institutes_router;