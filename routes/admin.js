const express = require("express");
const adminRepo = require("../repos/admin-repo");
const router = express.Router();

router.get("/", async (req, res) => {
  const admin = await adminRepo.get();
  res.send(admin);
});

router.post("/", async (req, res) => {
  const admin = await adminRepo.add(req.body);
  res.send(admin);
});

module.exports = router;
