const emails_router = require("express").Router();

const emails_controller = require("../controllers/emails.controller");

const upload = require("../global/multer.module.config");

emails_router.post("/send-email", upload.any() , emails_controller.sendEmail);

module.exports = emails_router;