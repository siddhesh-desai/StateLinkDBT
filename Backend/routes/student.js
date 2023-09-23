const express = require('express');
const router = express.Router();
const multer = require('multer')
const studentController = require('../controllers/Student');

const upload = multer({ storage: multer.memoryStorage() });

router.get('/', studentController.protected)
router.get('/documents', studentController.uploadAllDoc_get)
router.get('/upload/aadhaar', studentController.upload_addhar_get)
router.get('/upload/personal', studentController.personalInfo_get)

router.post('/upload/aadhaar', upload.single("addhar"), studentController.upload_addhar)
router.post('/upload/passbook', upload.single("passbook"), studentController.upload_bank_passbook)
router.post('/upload/caste', upload.single("caste_cert"), studentController.upload_caste_cert)
router.post('/upload/income', upload.single("income_cert"), studentController.upload_income_cert)
router.post('/upload/domicile', upload.single("domicile_cert"), studentController.upload_domicile_cert)

module.exports = router


