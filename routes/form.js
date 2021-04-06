const express = require("express");
const router = express.Router();

router.use(express.static("public"));

router.post("/noc", (req, res) => {
  const student = {
    id: req.body.id,
    name: req.body.name,
    short_dept: req.body.short_dept,
    full_dept: req.body.full_dept,
    date: req.body.date,
  };
  res.render("noc", { student });
});

router.post("/lor", (req, res) => {
  const student = {
    id: req.body.id,
    name: req.body.name,
    short_dept: req.body.short_dept,
    full_dept: req.body.full_dept,
    date: req.body.date,
    start: req.body.start,
    end: req.body.end,
  };
  res.render("lor", {
    student,
  });
});

module.exports = router;
