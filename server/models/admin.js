import mongoose from "mongoose";
const adminSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
});

export default mongoose.model("Admin", adminSchema);
