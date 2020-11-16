const mongoose = require('mongoose');
require('../database/db');

const ContactSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    reg_date: {
        type: Date,
        default: Date.now
    }
});

const Contact = mongoose.model('Contact', ContactSchema);
module.exports = Contact;

module.exports.newContact = async (newContact, callback) => {
    await newContact.save(callback); //create New Contact

}


