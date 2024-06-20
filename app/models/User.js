import mongoose from 'mongoose'

const User = mongoose.models.Users || mongoose.model('Users', new mongoose.Schema({
    name: String,
    wallet: String,
    refs: Array,
    role: String,
}, { timestamps: true }));

export default User;