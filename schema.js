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
  Amount: { type: Number, required: true },
  Curr: { type: String, required: true },
  Bank: { type: String, required: false},
  TrxDate: { type: String, required: true },
  Status: { type: String, required: true },
  ContraAccounting: [
    {
      ContraCrDb: { type: String, required: true },
      ContraAcct: { type: String, required: true },
      ContraAmount: { type: String, required: true },
      ContraCurr: { type: String, required: true },
      ROE: { type: Number, required: true },
      Job: { type: String, required: false },
      Dept: { type: String, required: false },
      BookDate: { type: String, required: true },
      Partner: { type: String, required: false },
      SBU: { type: String, required: false },
      MMYY_From: { type: String, required: false },
      MMYY_Thru: { type: String, required: false },
      PIC: { type: String, required: false }
    }
  ]

});

module.exports = {
  beyondoneones: beyondoneones,
  uroles: uroles,
  
}