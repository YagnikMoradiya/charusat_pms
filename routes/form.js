const express = require("express");
const router = express.Router();

router.use(express.static("public"));

const student = {
  id: "19DIT031",
  name: "MORADIYA YAGNIKKUMAR SHAMBHUBHAI",
  short_dept: "IT",
  full_dept: "Information Technology",
  date: "20/10/2001",
  start: "11 January 2021",
  end: "10 May 2021",
};

router.get("/noc", (req, res) => {
  res.render("noc", {
    student,
  });
});

router.get("/lor", (req, res) => {
  res.render("lor", {
    student,
  });
});

module.exports = router;
