const news_router = require("express").Router();

const news_controller = require("../controllers/news.controller");

news_router.post("/news/add-news", news_controller.post_news);

news_router.get("/news/all-news", news_controller.get_all_news);

news_router.delete("/news/delete-news/:news_id", news_controller.delete_news);

module.exports = news_router;