const Student = require('../models/Student');
const {initializeApp} = require('firebase/app')
const {getStorage, ref, getDownloadURL, uploadBytesResumable} = require('firebase/storage')

const config = require('../config/config')

//Initialize a firebase application
initializeApp(config.firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();

// Setting up multer as a middleware to grab photo uploads


const protected = (req, res, next) => {
    // console.log(res.locals.user)
    res.render('protected')
}

const uploadAllDoc_get = (req, res, next) => {
    res.render('student/uploadDocuments')
}

const upload_addhar_get = (req, res, next) => {
    let addhar = undefined
    if(res.locals.user.addharUploded){
        addhar = res.locals.user.addhar
    }
    res.render("student/uploadAdhar", {email:res.locals.user.email, addhar})
}

const upload_addhar = async (req, res, next) => {
    try {
        if(!req.file) {
            return res.redirect('/student/upload/aadhaar');
        }
        const filename = `addhar_card_${res.locals.user._id}`
        const storageRef = ref(storage, `files/${filename}`);
        const metadata = {
            contentType: req.file.mimetype,
        };
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);
		const result = await Student.findByIdAndUpdate(res.locals.user._id,  { $set: {addharUploded: true, addhar:downloadURL} }, { new: true });
        console.log('File successfully uploaded.', result);
        return res.redirect('/student/upload/aadhaar')
        // return res.send(result)
    } catch (error) {
        console.log(error)
        // res.send(error)
        return res.redirect('/student/upload/personal')
    }
}

const personalInfo_get = (req, res, next) => {
    res.render('student/personalInfo', {user:res.locals.user})
}

const upload_bank_passbook = async (req, res, next) => {
    try {
        if(!req.file) {
            return res.redirect('/student/upload/personal');
        }
        const {bankAccountNumber, bankIFSCode} = req.body;
        const filename = `bank_passbook_${res.locals.user._id}`
        const storageRef = ref(storage, `files/${filename}`);
        const metadata = {
            contentType: req.file.mimetype,
        };
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);
		const result = await Student.findByIdAndUpdate(res.locals.user._id,  { $set: {bankUploded: true, bankPassbook:downloadURL} }, { new: true });
        console.log('File successfully uploaded.', result);
        return res.redirect('/student/documents')
    } catch (error) {
        // return res.status(400).send(error.message)
        console.log(error)
        return res.redirect('/student/documents')
    }
}

const upload_ssc_marksheet = async (req, res, next) => {
    try {
        if(!req.file) {
            return res.redirect('/student/upload/personal');
        }
        const filename = `ssc_marksheet_${res.locals.user._id}`
        const storageRef = ref(storage, `files/${filename}`);
        const metadata = {
            contentType: req.file.mimetype,
        };
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);
		const result = await Student.findByIdAndUpdate(res.locals.user._id,  { $set: {ssc_uploaded: true, ssc_marksheet:downloadURL} }, { new: true });
        console.log('File successfully uploaded.', result);
        return res.redirect('/student/documents')
    } catch (error) {
        // return res.status(400).send(error.message)
        console.log(error)
        return res.redirect('/student/documents')
    }
}

const upload_hsc_marksheet = async (req, res, next) => {
    try {
        if(!req.file) {
            return res.redirect('/student/upload/personal');
        }
        const filename = `hsc_marksheet_${res.locals.user._id}`
        const storageRef = ref(storage, `files/${filename}`);
        const metadata = {
            contentType: req.file.mimetype,
        };
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);
		const result = await Student.findByIdAndUpdate(res.locals.user._id,  { $set: {hsc_uploaded: true, hsc_marksheet:downloadURL} }, { new: true });
        console.log('File successfully uploaded.', result);
        return res.redirect('/student/documents')
    } catch (error) {
        // return res.status(400).send(error.message)
        console.log(error)
        return res.redirect('/student/documents')
    }
}

const upload_caste_cert = async (req, res, next) => {
    try {
        // console.log(req.file)
        // console.log(first)
        if(!req.file) {
            return res.redirect('/student/upload/personal');
        }
        const filename = `caste_cert_${res.locals.user._id}`
        const storageRef = ref(storage, `files/${filename}`);
        const casteCategory = req.body.caste
        const metadata = {
            contentType: req.file.mimetype,
        };
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);
		const result = await Student.findByIdAndUpdate(res.locals.user._id,  { $set: {casteUploded: true, casteCretificate:downloadURL, casteCategory} }, { new: true });
        console.log('File successfully uploaded.', result);
        return res.redirect('/student/upload/personal')
    } catch (error) {
        // return res.status(400).send(error.message)
        console.log(error)
        return res.redirect('/student/upload/personal')
    }
}

const upload_income_cert = async (req, res, next) => {
    try {
        if(!req.file) {
            return res.redirect('/student/upload/personal');
        }
        const familyAnnualIncome = req.body.income
        const filename = `income_cert_${res.locals.user._id}`
        const storageRef = ref(storage, `files/${filename}`);
        const metadata = {
            contentType: req.file.mimetype,
        };
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);
		const result = await Student.findByIdAndUpdate(res.locals.user._id,  { $set: {incomeUploded: true, incomeCertificate:downloadURL, familyAnnualIncome} }, { new: true });
        console.log('File successfully uploaded.', result);
        return res.redirect('/student/upload/personal')
    } catch (error) {
        // return res.status(400).send(error.message)
        console.log(error)
        return res.redirect('/student/upload/personal')
    }
}

const upload_domicile_cert = async (req, res, next) => {
    try {
        if(!req.file) {
            return res.redirect('/student/upload/personal');
        }
        const domicileState = req.body.state
        const filename = `domicile_cert_${res.locals.user._id}`
        const storageRef = ref(storage, `files/${filename}`);
        const metadata = {
            contentType: req.file.mimetype,
        };
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);
		const result = await Student.findByIdAndUpdate(res.locals.user._id,  { $set: {domicileUploded: true, domicileCertificate:downloadURL, domicileState} }, { new: true });
        console.log('File successfully uploaded.', result);
        return res.redirect('/student/upload/personal')
    } catch (error) {
        // return res.status(400).send(error.message)
        console.log(error)
        return res.redirect('/student/upload/personal')
    }
}

module.exports = {
    protected,
    uploadAllDoc_get,
    upload_addhar_get,
    upload_addhar,
    upload_bank_passbook,
    upload_ssc_marksheet,
    upload_hsc_marksheet,
    upload_caste_cert,
    upload_income_cert,
    upload_domicile_cert,
    personalInfo_get
}
