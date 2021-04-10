const express = require("express");
const studentRepo = require("../repos/student-repo");
const router = express.Router();

router.post("/", async (req, res) => {
  const student = await studentRepo.add(req.body);
  if (student) {
    res.json({
      status: 200,
      data: student,
    });
  } else {
    res.sendStatus(400);
  }
});

router.get("/", async (req, res) => {
  const student = await studentRepo.getStudent();
  if (student.length > 0) {
    res.json({
      status: 200,
      data: student,
    });
  } else {
    res.sendStatus(404);
  }
});

router.get("/:id", async (req, res) => {
  const student = await studentRepo.getStudentByID(req.params.id);
  const academic = await studentRepo.getAcademic(student.id);
  const exam_detail = await studentRepo.getExamdetail(student.id);
  const alumina = await studentRepo.getAluminaByID(student.id);
  const achivement = await studentRepo.getAchivement(student.id);
  const skill = await studentRepo.getSkill(student.id);
  const project = await studentRepo.getProject(student.id);

  const fullDetail = {
    student,
    academic,
    exam_detail,
    alumina,
    achivement,
    skill,
    project,
  };

  if (student) {
    res.json({
      status: 200,
      data: fullDetail,
    });
  } else {
    res.sendStatus(404);
  }
});

router.patch("/:id", async (req, res) => {
  const student = await studentRepo.updateStudent(req.body, req.params.id);
  if (student) {
    res.send(student);
  } else {
    res.sendStatus(404);
  }
});

router.patch("/del/:id", async (req, res) => {
  const student = await studentRepo.deleteStudent(req.params.id);
  if (student) res.send(student);
  else res.sendStatus(400);
});

router.post("/alumina", async (req, res) => {
  const alumina = await studentRepo.addAlumina(req.body);
  if (alumina) {
    res.send(alumina);
  } else {
    res.sendStatus(400);
  }
});

router.patch("/alumina/:id", async (req, res) => {
  const alumina = await studentRepo.updateAlumina(req.body, req.params.id);
  if (alumina) {
    res.send(alumina);
  } else {
    res.sendStatus(400);
  }
});

router.get("/alumina/:id", async (req, res) => {
  const alumina = await studentRepo.getAluminaByID(req.params.id);
  if (alumina) {
    res.send(alumina);
  } else {
    res.sendStatus(404);
  }
});

router.delete("/alumina/:id", async (req, res) => {
  const alumina = await studentRepo.deleteAluminaByID(req.params.id);
  if (alumina) {
    res.send(alumina);
  } else {
    res.sendStatus(404);
  }
});

router.post("/academic", async (req, res) => {
  const academic = await studentRepo.addAcademic(req.body);
  if (academic) {
    res.send(academic);
  } else {
    res.sendStatus(400);
  }
});

router.get("/academic/:id", async (req, res) => {
  const academic = await studentRepo.getAcademic(req.params.id);
  if (academic) res.send(academic);
  else res.sendStatus(404);
});

router.put("/academic/:id", async (req, res) => {
  const academic = await studentRepo.updateAcademic(req.body, req.params.id);
  if (academic) res.send(academic);
  else res.sendStatus(400);
});

router.post("/achivement", async (req, res) => {
  const achivement = await studentRepo.addAchivement(req.body);
  if (achivement) res.send(achivement);
  else res.sendStatus(400);
});

router.get("/achivement/:id", async (req, res) => {
  const achivement = await studentRepo.getAchivement(req.params.id);
  if (achivement) res.send(achivement);
  else res.sendStatus(404);
});

router.put("/achivement/:id", async (req, res) => {
  const achivement = await studentRepo.updateAchivement(
    req.body,
    req.params.id
  );
  if (achivement) res.send(achivement);
  else res.sendStatus(400);
});

router.post("/exam", async (req, res) => {
  const exam_detail = await studentRepo.addExamdetail(req.body);
  if (exam_detail) res.send(exam_detail);
  else res.sendStatus(400);
});

router.get("/exam/:id", async (req, res) => {
  const exam = await studentRepo.getExamdetail(req.params.id);
  if (exam.length > 0) res.send(exam);
  else res.sendStatus(404);
});

router.put("/exam/:id", async (req, res) => {
  const exam_detail = await studentRepo.updateExamdetail(
    req.body,
    req.params.id
  );
  if (exam_detail) res.send(exam_detail);
  else res.sendStatus(400);
});

router.post("/skill", async (req, res) => {
  const skill = await studentRepo.addSkill(req.body);
  if (skill) res.send(skill);
  else res.sendStatus(400);
});

router.get("/skill/:id", async (req, res) => {
  const skill = await studentRepo.getSkill(req.params.id);
  if (skill) res.send(skill);
  else res.sendStatus(404);
});

router.put("/skill/:id", async (req, res) => {
  const skill = await studentRepo.updateSkill(req.body, req.params.id);
  if (skill) {
    res.send(skill);
  } else res.sendStatus(400);
});

router.post("/project", async (req, res) => {
  const project = await studentRepo.addProject(req.body);
  if (project) {
    res.send(project);
  } else res.sendStatus(400);
});

router.get("/project/:id", async (req, res) => {
  const project = await studentRepo.getProject(req.params.id);
  if (project.length > 0) res.send(project);
  else res.sendStatus(404);
});

router.put("/project/:id", async (req, res) => {
  const project = await studentRepo.updateProject(req.body, req.params.id);
  if (project) {
    res.send(project);
  } else res.sendStatus(400);
});

router.delete("/project/:id", async (req, res) => {
  const project = await studentRepo.deleteProject(req.params.id);
  if (project) {
    res.send(project);
  } else res.sendStatus(400);
});

module.exports = router;
