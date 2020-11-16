const ContactController = require('../../controllers/contact');
const verify = require('../../middleware/auth');
var express = require('express');
var router = express.Router();


/*  @route     POST /api/contacts/add
    @desc      Add a new contact
    @access    Public 
    */

router.post('/add', ContactController.add_new_contact);

/*  @route     PUT /api/contacts/add
    @desc      Update a new contact
    @access    Private
    */

router.put('/:contactId', verify, ContactController.edit_contact);

/*  @route     Delete /api/contacts/a
    @desc      Delete a contactId
    @access    Private 
    */

router.delete('/:contactId', verify, ContactController.delete_contact);


/*  @route     Get /api/contacts/:id
    @desc      Get a single contact
    @access    Public
    */
router.get('/:contactId', ContactController.get_one);

/*  @route     Get /api/contacts/:id
    @desc      Get all contact
    @access    Public
    */
router.get('/', ContactController.get_all_contacts);


module.exports = router;
