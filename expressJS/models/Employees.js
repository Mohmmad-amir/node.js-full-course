const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeesSchema = new Schema({
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Employee', employeesSchema);