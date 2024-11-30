require("dotenv").config();

const express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const usersRouter = require("./api/users/user.router");
const brandsRouter = require("./api/brands/brand.router");
const companyRouter = require("./api/company/company.router");
const genericRouter = require("./api/generic/generic.router");
const productRouter = require("./api/products/product.router");
const chemistDrugistRouter = require("./api/chemist_drugist/chemistDrugist.router");
const orderRouter = require("./api/orders/order.router");
const newsRouter = require("./api/news/news.router");
const licencesRouter = require("./api/key_generator/keyGenerator.router");
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/brands", brandsRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/generic", genericRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/chemist-drugist", chemistDrugistRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/news", newsRouter);
app.use("/api/v1/licences", licencesRouter);

const adminRouter = require("./api/admin/admin.router");
app.use("/api/v1/admin", adminRouter);

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

const admin = require("firebase-admin");

// Initialize Firebase Admin
const serviceAccount = require("./config/service-json.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.listen(port, "0.0.0.0", () => {
  console.log("app started on port " + port);
});
