const news_router = require("express").Router();

const news_controller = require("../controllers/news.controller");

news_router.post("/add-news", news_controller.post_news);

news_router.get("/last-ten-news", news_controller.get_last_ten_news);

news_router.get("/all-news", news_controller.get_all_news);

news_router.delete("/delete-news/:news_id", news_controller.delete_news);

module.exports = news_router;