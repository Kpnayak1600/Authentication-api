import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique: false,
    },
    email: {
        type: String,
        required: [true, "Please provide a unique email"],
        unique: [true, "Username Exist"]
    },
});

export default mongoose.model.Users || mongoose.model('User', UserSchema);