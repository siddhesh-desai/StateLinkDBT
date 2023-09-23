const mongoose = require('mongoose');
const { isEmail } = require('validator');
// const bcrypt = require('bcrypt');

const studentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
  //=============== Addhar Card ============================
  addhar: { type: String },
  addharUploded: {type : Boolean, default : false},
  // ============== Personal Information =============================

  //==================== Personal Details =============================

  fullName: { type: String },
  // lastName: { type: String, minlength: [3, 'Last Name is required'] },
  aadharNumber: {type: String},
  mobileNumber: { type: String },
  dob: { type: Date },
  gender: { type: String },
  fatherName: { type: String },
  motherName: { type: String },
  address: { type: String },
  state: { type: String },
  district: { type: String },
  taluka: { type: String },
  pincode: { type: String },
  piUploded: {type : Boolean,  default : false},
  // maritalStatus: { type: String },

  //============== Religion and Caste detail ==================


  casteCategory: { type: String },
  caste: {type: String },
  haveCasteCertificate: { type: Boolean, default: false },
  casteCertificateNumber: { type: String },
  // casteIssuingDistrict: { type: String },
  casteApplicantName: { type: String },
  casteIssuingAuthority: { type: String },
  casteIssuingDate: { type: Date },
  casteCretificate: { type: String },
  casteUploded: {type : Boolean,  default : false},
  
  
  // ============== Income Details =============================

  familyAnnualIncome: { type: String },
  haveIncomeCertificate: { type: Boolean , default: false },
  incomeCertificateNumber: { type: String },
  incomeIssuingAuthority: { type: String },
  incomeIssuingDate: { type: Date },
  incomeCertificate: { type: String },
  incomeUploded: {type : Boolean,  default : false},

  
  // ============== Domicile Details =============================

  domicileState: { type: String },
  haveDomicileCertificate: { type: Boolean, default: false },
  domicileCertificateNumber: { type: String },
  // domicileRelationType: { type: String },
  domicileIssuingAuthority: { type: String },
  domicileIssuingDate: { type: Date },
  domicileCertificate: { type: String },
  domicileUploded: {type : Boolean,  default : false},

  
  // ============== Personal Eligibility Details =============================

  // isSalaried: { type: Boolean, default: false },
  // haveDisability: { type: Boolean, default: false },
  // disabilityDesc: { type: String },
  // disabilityCertificate: { type: String },

  // ============== Aadhaar Bank Details =============================

  // isAadharLinkedToBank: { type: Boolean, default: false },
  
  // ============== Bank Details =============================

  bankAccountNumber: { type: String },
  bankIFSCode: { type: String },
  bankPassbook: { type: String },
  bankUploded: {type : Boolean,  default : false},
  
  
  // ============== Other Information =============================

  // ============== Parent's/Guardian's Details =============================

  isFatherAlive: { type: Boolean, default: true},
  fatherOccupation: { type: String },
  isFatherSalaried: { type: Boolean, default: true},
  
  isMotherAlive: { type: Boolean, default: true },
  motherOccupation: { type: String },
  isMotherSalaried: { type: Boolean, default: false },
  parentUploded: {type : Boolean,  default : false},

  // ============== Current Course Information =============================
  currentCourse: [
    {
      ccAddmissionDate: { type: Date },
      ccInstituteState: { type: String },
      ccInstituteDistrict: { type: String },
      ccInstituteTaluka: { type: String },
      ccQualificationLevel: { type: String },
      ccStream: { type: String },
      ccCollegeName: { type: String }, 
      ccCourseName: { type: String },
      ccBoradUniversityName : {type : String},
      ccAddmissionType: { type: String },
      ccCETpercentage: { type: mongoose.Types.Decimal128 },
      ccCETadmitCardNumber: { type: String },
      ccAdmitCard: { type: String },
      ccCAPIDcertificate: { type: String },
      ccYearOfStudy: { type: String },
      ccCompletedOrContinue: { type: String },
      ccIsProfessional: { type: String },
      ccIsAddmissionThroughOpenOrReserved: { type: String },
    }
  ],
  ccUploded: {type : Boolean,  default : false},


  // ============== Past Qualifications Information =============================

  // pastQualifications: [
  //   {
  //     pqLevel: { type: String },
  //     pqStream: { type: String },
      
  //     pqCollegeName: { type: String },
  //     pqBoardUniversityName: { type: String }, 
  //     pqPassingYear: { type: Number },
  //     pqResult: { type: String },
  //     pqPercentage: { type: mongoose.Types.Decimal128 },
  //     pqMarksheet: { type: String },  
  //   }
  // ],
  // pq10Uploded: {type : Boolean,  default : false},
  // pq12Uploded: {type : Boolean,  default : false},
  ssc_marksheet : { type: String },
  ssc_uploaded : { type: Boolean, default: false },
  ssc_collage_name : { type: String },
  ssc_board : { type: String },
  ssc_passing_year : { type: Number },
  ssc_result : { type: String },
  ssc_percentage : { type: mongoose.Types.Decimal128  },

  hsc_marksheet : { type: String },
  hsc_uploaded : { type: Boolean, default: false },
  hsc_stream : { type: String },
  hsc_collage_name : { type: String },
  hsc_board : { type: String },
  hsc_passing_year : { type: Number },
  hsc_result : { type: String },
  hsc_percentage : { type: mongoose.Types.Decimal128  },

  // =================== Appied Scholarship =====================
  scholarshipStatus: { type: String },
  appliedScholarship: { type: String },
  appliedScholarshipDate: {type : Date},
  declineMessage: {type : String}

  // ============== Hostel Information =============================

  // hostelDetails: [
  //   {
  //     hiBeneficiaryCategory: { type: String },
  //     hostelName: { type: String }, 
  //     hostelAddress: { type: String },
  //     hostelState: { type: String },
  //     hostelDistrict: { type: String },
  //     hostelTaluka: { type: String },
  //     hostelVillage: { type: String },
  //     hostelPinCode: { type: String },
  //     hostelType: { type: String },
  //     hostelAdmissionDate: { type: Date },
  //     hostelIsMessAvailable: { type: String },
  //     hostelAddmissionLetter: { type: String },
  //   }
  // ],
});


// fire a function before doc saved to db
// studentSchema.pre('save', async function(next) {
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// static method to login student
studentSchema.statics.login = async function(email, password) {
  const student = await this.findOne({ email });
  if (student) {
    // const auth = await bcrypt.compare(password, student.password);
    const auth = password == student.password;
    if (auth) {
      return student;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

const Student = mongoose.model('student', studentSchema);

module.exports = Student;