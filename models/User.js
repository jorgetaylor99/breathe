const { Schema, model } = require("../db/connection");

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    logs: [
        {
            peakflow: { type: Number, required: false },
            symptoms: { type: String, required: false },
            notes: { type: String, required: false },
            timestamp: { type: Date, default: Date.now },
        },
    ],
    medications: [
        {
            medication: { type: String, required: true },
            dosage: { type: String, required: true },
            frequency: { type: String, required: true },
            color: { type: String, required: true },
        },
    ],
});

const User = model("User", UserSchema);
module.exports = User;
