const mongoose = require("mongoose")

const StudentSchema = new mongoose.Schema({
  MSSV: { type: String, required: true },
  FullName: { type: String, required: true },
});

module.exports = {
  StudentSchema: StudentSchema,
}