 import mongoose from 'mongoose';

 const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        match: [/^[a-zA-Z\s]+$/, 'Please enter a valid name.']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address.']
    },
    password: {
        type: String,
        required: true,
    }
});


 export default mongoose.model("users", userSchema);