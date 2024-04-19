const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        unique: true,
    },
    fullName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    salary: {
        type: Number,
    },
    companyName: {
        type: String,
    },
    loanAmount: {
        type: Number,
    },
    nextSalaryDate: {
        type: Date,
    },
    loanStatus: {
        type: String,
    },
    nextSalaryAmount: {
        type: Number,
    },
    loanStartDate: {
        type: Date,
    },
    loanEndDate: {
        type: Date,
    },
    loanInterest: {
        type: Number,
    },
})


userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = new mongoose.model("userDatas", userSchema);