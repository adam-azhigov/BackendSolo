const { Router } = require("express");
const { patientControllers } = require("../controllers/patients.controllers")

const router = Router();



router.get("/api/patients", patientControllers.getAllPatients); // вывод  всех пациентов
router.get('/api/patient/:id', patientControllers.getPatientId)
router.post("/api/patient", patientControllers.postPatient); // добавить пациента
router.delete("/api/patient/:id", patientControllers.deletePatientId); // удаление пациена по ид

module.exports = router;
