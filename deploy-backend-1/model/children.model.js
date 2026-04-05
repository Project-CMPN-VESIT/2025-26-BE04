import mongoose from "mongoose";

const childrenSchema = new mongoose.Schema({
name: {type: String, required: true},
dob: {type: Date, required: true},
gender: {type: String, required: true, enum: ['male', 'female']},
// age : {type: Number},
height: {type: Number, required: true},
weight: {type: Number, required: true},
centre: {type: mongoose.Schema.Types.ObjectId, ref: "Centre", required: true},
parentName: {type: String, default: "No Parent"},
parentContact: {type: String, default: "No Contact"},
medicalHistory: {type: String, default: "No Medical History"},
childrenImage: {type: String, default: "No Image"},
aadharNumber: {type: String, default: "No Aadhar present"},
aadharCardImage: {type: String, default: "No Aadhar Image"},
dateofjoining: {type: Date, required: true},
dateofleaving: {type: Date, default: null},
ageOfJoining: {type: Number, required: true},
ageOfLeaving: {type: Number, default: null},
detailsOfChild: {type: String, default: "No Details Available"},
achievementsOfChild: {type: String, default: "No Achievements Yet"},
standardofEducation: {type: String, default: "Not Enrolled"},
sscMarks: {type: Number, default: null},
hscMarks: {type: Number, default: null},
},{
    timestamps: true,
});

childrenSchema.virtual("age").get(function () {
  if (!this.dob) return null;

  const today = new Date();
  let age = today.getFullYear() - this.dob.getFullYear();

  const m = today.getMonth() - this.dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < this.dob.getDate())) {
    age--;
  }

  return age;
});

childrenSchema.set("toJSON", { virtuals: true });
childrenSchema.set("toObject", { virtuals: true });

export const Children = mongoose.model('Children',childrenSchema)