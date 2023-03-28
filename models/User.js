const {Schema, model} = require('../db/connection')

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    logs: [
        {
            peakflow: { type: Number, required: false },
            symptoms: { type: String, required: false },
            notes: { type: String, required: false },
            timestamp: { type: Date, default: Date.now }
        }
    ]
});

const User = model('User', UserSchema);
module.exports = User;