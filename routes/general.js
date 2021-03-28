const express = require("express");
const generalRepo = require("../repos/general-repo");
const router = express.Router();

// Country
router.get("/country", async (req, res) => {
  const country = await generalRepo.getCountry();
  if (country) res.send(country);
  else res.sendStatus(404);
});

router.get("/state/:id", async (req, res) => {
  const state = await generalRepo.getState(req.params.id);
  if (state.length > 0) res.send(state);
  else res.sendStatus(404);
});

// Institutes
router.get("/institute", async (req, res) => {
  const institute = await generalRepo.getInstitute();
  res.send(institute);
});

router.get("/department/:id", async (req, res) => {
  const department = await generalRepo.getDepartment(req.params.id);
  if (department.length > 0) res.send(department);
  else res.sendStatus(404);
});

// Apply
router.post("/apply", async (req, res) => {
  const apply = await generalRepo.addApply(req.body);
  if (apply) res.send(apply);
  else res.sendStatus(400);
});

router.get("/apply", async (req, res) => {
  const apply = await generalRepo.getApply();
  if (apply.length > 0) res.send(apply);
  else res.sendStatus(404);
});

router.delete("/apply/:id", async (req, res) => {
  const apply = await generalRepo.deleteApply(req.params.id);
  if (apply) res.send(apply);
  else res.sendStatus(404);
});

router.get("/apply/stu/:id", async (req, res) => {
  const stuApply = await generalRepo.getApplyBystuid(req.params.id);
  if (stuApply.length > 0) res.send(stuApply);
  else res.sendStatus(404);
});

router.get("/apply/cmp/:id", async (req, res) => {
  const cmpApply = await generalRepo.getApplyBycmpid(req.params.id);
  if (cmpApply.length > 0) res.send(cmpApply);
  else res.sendStatus(404);
});

// Drives
router.post("/drive", async (req, res) => {
  const drive = await generalRepo.addDrive(req.body);
  if (drive) res.send(drive);
  else res.sendStatus(400);
});

router.get("/drive", async (req, res) => {
  const drive = await generalRepo.getDrive();
  if (drive.length > 0) res.send(drive);
  else res.sendStatus(404);
});

router.patch("/drive/:id", async (req, res) => {
  const drive = await generalRepo.updateDrive(req.body, req.params.id);
  if (drive) res.send(drive);
  else res.sendStatus(400);
});

router.delete("/drive/:id", async (req, res) => {
  const drive = await generalRepo.deleteDrive(req.params.id);
  if (drive) res.send(drive);
  else res.sendStatus(404);
});

router.get("/drive/:id", async (req, res) => {
  const drive = await generalRepo.getDriveBycmpId(req.params.id);
  if (drive) res.send(drive);
  else res.sendStatus(404);
});

// Hire
router.post("/hire", async (req, res) => {
  const hire = await generalRepo.addHired(req.body);
  if (hire) res.send(hire);
  else res.sendStatus(400);
});

router.get("/hire", async (req, res) => {
  const hire = await generalRepo.getHired();
  if (hire.length > 0) res.send(hire);
  else res.sendStatus(404);
});

router.delete("/hire/:id", async (req, res) => {
  const hire = await generalRepo.removeHired(req.params.id);
  if (hire) res.send(hire);
  else res.sendStatus(404);
});

// requests
router.post("/request", async (req, res) => {
  const request = await generalRepo.addRequest(req.body);
  if (request) res.send(request);
  else res.sendStatus(400);
});

router.get("/request/:id", async (req, res) => {
  const request = await generalRepo.getRequest(req.params.id);
  if (request) res.send(request);
  else res.sendStatus(404);
});

router.patch("/request/:id", async (req, res) => {
  const request = await generalRepo.confirmRequest(req.params.id);
  if (request) res.send(request);
  else res.sendStatus(400);
});

router.delete("/request/:id", async (req, res) => {
  const request = await generalRepo.deleteRequest(req.params.id);
  if (request) res.send(request);
  else res.sendStatus(400);
});

module.exports = router;
