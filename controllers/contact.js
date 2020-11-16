const Contact = require('../models/contact');

//ADD NEW CONTACT
exports.add_new_contact = async (req, res) => {
    const { firstname, lastname, phone } = req.body;

    //input validation
    if (!firstname || !lastname || !phone) {
        return res.status(400).json({
            error: 'Please all fields are required'
        });
    }
    const newContact = new Contact({
        firstname: firstname,
        lastname: lastname,
        phone: phone
    });
    await Contact.newContact(newContact, (err, contact) => {
        if (err) return err;
        return res.status(200).json({
            message: "Contact created successfully",
            contact
        });
    });
}

//EDIT CONTACT
exports.edit_contact = async (req, res) => {
    const id = req.params.contactId;
    const { firstname, lastname, phone } = req.body;
    await Contact.findByIdAndUpdate(id).then(contact => {
        if (!contact) {
            return res.status(400).json({
                error: "Contact not found",
            });
        }
        contact.firstname = firstname;
        contact.lastname = lastname;
        contact.phone = phone;
        contact.save();
        return res.json({
            message: "Contact updated successfully",
            contact
        });
    }).catch(err => {
        return res.status(400).json({
            error: "Contact not found",
        });
    })
}

//DELETE CONTACT
exports.delete_contact = async (req, res) => {
    const id = req.params.contactId;
    await Contact.findByIdAndDelete(id).then(contact => {
        if (!contact) {
            return res.status(400).json({
                error: "Contact not found",
            });
        }
        return res.json({
            message: "Contact deleted successfully",
            contact
        });
    }).catch(err => {
        return res.json({
            error: err,
        });
    })
}

//FETCH ALL CONTACT
exports.get_all_contacts = async (req, res) => {
    await Contact.find().then(contact => {
        if (!contact) {
            return res.status(400).json({
                message: "contact not found",
            });
        }
        return res.status(200).json({
            contact
        });
    }).catch(err => {
        return res.status(400).json({
            message: `contact not foun ${err}`,
        });
    });
}

//GET SINGLE CONTACT
exports.get_one = (req, res) => {
    Contact.findById(req.params.contactId)
        .then(contact => res.status(200).json({
            success: true,
            contact
        })).
        catch(err => res.status(404).json({
            success: false,
            err
        }))
}
