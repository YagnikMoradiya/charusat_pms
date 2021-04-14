const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");

const middlewares = require("../src/middleware");

const studentRouter = require("../routes/student");
const companyRouter = require("../routes/company");
const adminRouter = require("../routes/admin");
const generalRouter = require("../routes/general");
const formRouter = require("../routes/form");

module.exports = () => {
  const app = express();

  app.set("view engine", "ejs");

  app.use(cors());
  app.use(morgan("tiny"));
  app.use(compression());
  app.use(helmet());
  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({
      message: "🏡 Hello 🏡",
    });
  });

  app.use("/students", studentRouter);
  app.use("/companies", companyRouter);
  app.use("/admin", adminRouter);
  app.use("/general", generalRouter);
  app.use("/form", formRouter);

  app.use(middlewares.notFound);
  app.use(middlewares.errorHandler);

  return app;
};
