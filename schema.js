const mongoose = require("mongoose")

const uroles = new mongoose.Schema({
  email: { type: String, required: true },
  studentprofile: { type: Boolean, required: true },
  academicrecord: { type: Boolean, required: true },
  examresult: { type: Boolean, required: true },
});

const beyondoneones = new mongoose.Schema({
  TrxNo: { type: String, required: true },
  Descr: { type: String, required: true },
  CrDb: { type: String, required: true },
  OneOneAcct: { type: String, required: true },
  Amount: { type: String, required: true },
  Curr: { type: String, required: true },
  Bank: { type: String, required: false},
  TrxDate: { type: String, required: true },
  Status: { type: String, required: true },
  ContraAccounting: { type: Object, required: true },

});

module.exports = {
  beyondoneones: beyondoneones,
  uroles: uroles,
  
}