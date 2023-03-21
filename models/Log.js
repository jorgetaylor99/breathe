const {Schema, model} = require('../db/connection')

const LogSchema = new Schema({
    email: { type: String, required: true },
    peak_value: { type: Number, required: false },
});

const Log = model('Log', LogSchema);
module.exports = Log;