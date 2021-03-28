const express = require("express");
const companyRepo = require("../repos/company-repo");
const router = express.Router();

router.get("/", async (req, res) => {
  const company = await companyRepo.get();
  if (company.length > 0) res.send(company);
  else res.sendStatus(404);
});

router.post("/", async (req, res) => {
  const company = await companyRepo.add(req.body);
  if (company) res.send(company);
  else res.sendStatus(400);
});

router.get("/:id", async (req, res) => {
  const company = await companyRepo.getByID(req.params.id);
  if (company) res.send(company);
  else res.sendStatus(404);
});

router.put("/:id", async (req, res) => {
  const company = await companyRepo.updateCompany(req.body, req.params.id);
  if (company) res.send(company);
  else res.sendStatus(400);
});

router.patch("/del/:id", async (req, res) => {
  const company = await companyRepo.deleteCompany(req.params.id);
  res.send(company);
});

module.exports = router;
