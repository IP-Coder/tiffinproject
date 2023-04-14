const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: Number,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        default: 'customer',
        type: String,
        required: true
    }
})

const User = new mongoose.model("User", UserSchema);

module.exports = User;