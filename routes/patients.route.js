const { Router } = require("express");
const router = Router();

const patientsControllers = require("../controllers/patients.controllers");

router.get("/patients", patientsControllers.getAllPatients); //вывод  всех пациентов
router.post("/patient", patientsControllers.postPatient); //добавить пациента
router.delete("/patient/:id", patientsControllers.deletePatientId); //удаление пациена по ид

module.exports = router;
