const express = require("express");
const adminRepo = require("../repos/admin-repo");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const admin = await adminRepo.get(req.params.id);
  if (admin) res.send(admin);
  else res.sendStatus(404);
});

router.post("/", async (req, res) => {
  const admin = await adminRepo.add(req.body);
  res.send(admin);
});

router.post("/email", async (req, res) => {
  const admin = await adminRepo.getByEmail(req.params.email);
  res.send(admin);
});

module.exports = router;
