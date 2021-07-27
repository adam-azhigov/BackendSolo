const { Router } = require("express");
const { patientControllers } = require("../controllers/patients.controllers")

const router = Router();



router.get("/patients", patientControllers.getAllPatients); // вывод  всех пациентов
router.get('/patient/:id', patientControllers.getPatientId)
router.post("/patient", patientControllers.postPatient); // добавить пациента
router.delete("/patient/:id", patientControllers.deletePatientId); // удаление пациена по ид

module.exports = router;
