const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const EmployerSchema = mongoose.Schema({
    employerUserName: {
        type: String,
    },
    employerId: {
        type: String,
    },
    employerAddress: {
        type: String,
    },
    employerSalary: {
        type: Number,
    },
    employerLoanAmount: {
        type: Number,
    },
    employerNextSalaryDate: {
        type: Date,
    },
    employerLoanStatus: {
        type: String,
    },
    employerNextSalaryAmount: {
        type: Number,
    },
    employerLoanStartDate: {
        type: Date,
    },
    employerLoanEndDate: {
        type: Date,
    },
    employerLoanInterest: {
        type: Number,
    },
})

const companySchema = mongoose.Schema({
    companyName: {
        type: String,
        unique: true,
    },
    companyEmail: {
        type: String,
    },
    password: {
        type: String,
    },
   employers : [EmployerSchema],
   totalAmount: {
       type: Number,
   }
})


companySchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

companySchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = new mongoose.model("companyDatas", companySchema);