const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  dateOfBirth: { type: Date },
  occupation: { type: String },
  address: { type: String },
  phoneNumber: { type: String },
  medicalHistory: { type: String },
  chronicConditions: { type: String },
  allergies: { type: String },
  medications: { type: String },
  familyHistory: { type: String },
  lifestyleFactors: { type: String },
  recentChanges: { type: String },
  preferredCommunication: { type: String },
  healthcarePreferences: { type: String },
  culturalConsiderations: { type: String },
  currentIllness: { type: String },
  status: { type: String }
});

module.exports = mongoose.model('Patient', patientSchema);
