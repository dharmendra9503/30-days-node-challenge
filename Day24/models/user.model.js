import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(value);
            },
            message: 'Invalid email format'
        },
        unique: true,
        lowercase: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);