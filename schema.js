const mongoose = require("mongoose")

const uRoles = new mongoose.Schema({
  email: { type: String, required: true },
  studentprofile: { type: Boolean, required: true },
  academicrecord: { type: Boolean, required: true },
  examresult: { type: Boolean, required: true },
});

module.exports = {
  uRoles: uRoles,
}
