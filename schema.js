const mongoose = require("mongoose")

const uroles = new mongoose.Schema({
  email: { type: String, required: true },
  appname: { type: String, required: true },
  studentprofile: { type: Boolean, required: false },
  academicrecord: { type: Boolean, required: false },
  examresult: { type: Boolean, required: false },
});

const beyondmiscs = new mongoose.Schema({
  Cat: { type: String, required: true },
  Val: { type: String, required: false },
  Str1: { type: String, required: false },
  Str2: { type: String, required: false },
});

const miscs = new mongoose.Schema({
  Cat: { type: String, required: true },
  Val: { type: String, required: false },
  Str1: { type: String, required: false },
  Str2: { type: String, required: false },
});

const beyondoneones = new mongoose.Schema({
  TrxNo: { type: String, required: true },
  Descr: { type: String, required: true },
  Acct: { type: String, required: true },
  CrAmount: { type: Number, required: true },
  DbAmount: { type: Number, required: true },
  Curr: { type: String, required: true },
  Bank: { type: String, required: false},
  TrxDate: { type: String, required: true },
  Status: { type: String, required: true },
  ContraAccounting: [
    {
      Acct: { type: String, required: true },
      CrAmount: { type: String, required: true },
      DbAmount: { type: String, required: true },
      Curr: { type: String, required: true },
      ROE: { type: Number, required: true },
      Job: { type: String, required: false },
      Dept: { type: String, required: false },
      BookDate: { type: String, required: true },
      Partner: { type: String, required: false },
      SBU: { type: String, required: false },
      MMYY_From: { type: String, required: false },
      MMYY_Thru: { type: String, required: false },
      PIC: { type: String, required: false },
      ItemName: { type: String, required: false }
    }
  ]

});

module.exports = {
  beyondoneones: beyondoneones,
  uroles: uroles,
  beyondmiscs: beyondmiscs,
  miscs: miscs,
  
}
