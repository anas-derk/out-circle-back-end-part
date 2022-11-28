// create express app

const express = require("express");

const app = express();

// import and using cross origin resource sharing module for manipulate with requests from external links

const cors = require("cors");

app.use(cors());

// import and using body parser module for manipulate with form data

const body_parser = require("body-parser");

app.use(body_parser.json());

// direct the browser to statics files path

const path = require("path");

app.use("/assets", express.static(path.join(__dirname, "assets")));

// import routers

const individuals_router = require("./routes/individuals.router");

const craftsmen_router = require("./routes/craftsmen.router");

const scientific_careers_router = require("./routes/scientific_careers.router");

const companies_router = require("./routes/companies.router");

const institutes_router = require("./routes/institutes.router");

const partners_router = require("./routes/partners.router");

const users_router = require("./routes/users.router");

const emails_router = require("./routes/emails.router");

const admin_router = require("./routes/admin.router");

// const ads_router = require("./routes/ads.router");

const news_router = require("./routes/news.router");

const notifications_router = require("./routes/notifications.router");

app.use("/api/individuals", individuals_router);

app.use("/api/craftsmen", craftsmen_router);

app.use("/api/scientific-careers", scientific_careers_router);

app.use("/api/companies", companies_router);

app.use("/api/institutes", institutes_router);

app.use("/api/partners", partners_router);

app.use("/api/users", users_router);

app.use("/api/email", emails_router);

app.use("/api/admin", admin_router);

// app.use("/api/ads", ads_router);

app.use("/api/news", news_router);

app.use("/api/notifications", notifications_router);

// Allocated The Port

const PORT = process.env.PORT || 8000;

// Create And Running Server

app.listen(PORT, () => console.log(`The Server Is Running on: http://localhost:${PORT}`));