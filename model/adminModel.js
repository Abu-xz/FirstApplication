import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
   name:{
       type: String,
       required: true
   },
   email:{
       type: String,
       required: true,
        unique: true
   },
   password:{
       type: String,
       required: true,
       unique: true
   }
});

export default mongoose.model("admin", adminSchema);