const mongoose = require("mongoose");

const costumPropertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    fallback: { type: String, required: true },
});


const listSchema = new mongoose.Schema({
    title: { type: String, required: true },
    costumProperties: [costumPropertySchema],

});

module.exports = mongoose.model('List', listSchema);
