const scientific_careers_router = require("express").Router();

const scientific_careers_controller = require("../controllers/scientific_careers.controller");

const upload = require("../global/multer.module.config");

scientific_careers_router.post("/add-new-user", upload.any(), scientific_careers_controller.post_scientific_careers_account);

scientific_careers_router.get("/scientific-career-user-info/:scientific_career_id", scientific_careers_controller.get_scientific_career_info);

scientific_careers_router.put("/update-scientific-career-user-info/:scientific_career_id", upload.any(), scientific_careers_controller.put_scientific_career_info);

module.exports = scientific_careers_router;