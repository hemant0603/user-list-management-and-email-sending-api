const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
     listId: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true },
    properties: {
        type: Map,
        of: String,
    },
     subscribed: { type: Boolean, default: true }
});

module.exports = mongoose.model('User', userSchema);

