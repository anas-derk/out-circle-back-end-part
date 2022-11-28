const news_obj = require("../models/news.model");

function post_news(req, res) {
    news_obj.add_news(req.body)
    .then(() => res.json({}))
    .catch(err => res.json(err));
}

function get_last_ten_news(req, res) {
    news_obj.get_last_ten_news()
    .then(last_ten_news_list => res.json(last_ten_news_list))
    .catch(err => res.json(err));
}

function get_all_news(req, res) {
    news_obj.get_all_news()
    .then(news_list => res.json(news_list))
    .catch(err => res.json(err));
}

function delete_news(req, res) {
    news_obj.delete_news(req.params.news_id)
    .then(() => res.json({}))
    .catch(err => res.json(err));
}

module.exports = {
    post_news,
    get_last_ten_news,
    get_all_news,
    delete_news
};