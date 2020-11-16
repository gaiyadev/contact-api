const UserController = require('../../controllers/user');
// const auth = require('../../middlewares/auth');
var express = require('express');
var router = express.Router();


/*  @route     POST api/users/register
    @desc      Register a  new user to the system
    @access    Public
 */

router.post('/register', UserController.user_registration);

/*  @route     POST api/users/login
    @desc      Login a user to the system
    @access    Public
 */
router.post('/login', UserController.user_login);


module.exports = router;
