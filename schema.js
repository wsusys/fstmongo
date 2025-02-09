const mongoose = require("mongoose")

const uroles = new mongoose.Schema({
  email: { type: String, required: true },
  studentprofile: { type: Boolean, required: true },
  academicrecord: { type: Boolean, required: true },
  examresult: { type: Boolean, required: true },
  TrxNo: { type: String, required: true },
  Descr: { type: String, required: true },
});

const beyondoneones = new mongoose.Schema({
  TrxNo: { type: String, required: true },
  Descr: { type: String, required: true },
});

module.exports = {
  beyondoneones: beyondoneones,
  uroles: uroles,
  
}