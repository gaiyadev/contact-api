const User = require('../models/user');
const jwt = require('jsonwebtoken');

/** ===============================================================================================
 * USER REGISTRATION TO THE SYSTEM
 * ================================================================================================= *
 */
exports.user_registration = async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({
            error: 'Please all fields are required'
        });
    }
    await User.findOne({ email: email }).then(user => {
        if (user) return res.status(400).json({ error: 'User already exist with the given email' });
        const newUser = new User({
            name: name,
            email: email,
            password: password,
        });
        User.newUser(newUser, (err, user) => {
            if (err) return err;
            // success register ... Generating jwt for auth
            let refreshToken = jwt.sign({
                _id: user._id,
                email: user.email,
                name: user.name,
            }, process.env.JWT_REFRESH_SECRET, { algorithm: 'RS256' });

            jwt.sign({
                _id: user._id,
                email: user.email,
                name: user.name,
            },
                process.env.JWT_SECRET,
                {
                    expiresIn: 3600
                }, (err, token) => {
                    if (err) throw err;
                    return res.status(200).json({
                        token,
                        refreshToken,
                        user: {
                            _id: user._id,
                            email: user.email,
                            name: user.name,
                        },
                        message: "Account created successfully"
                    });
                });
        });
    }).catch(err => {
        console.log(err);
    });

}


/** ===============================================================================================
 * USER LOGIN TO THE SYSTEM
 * ================================================================================================= *
 */
exports.user_login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: 'Please all fields are required'
        });
    }

    await User.findOne({ email: email }).then(user => {
        if (!user) return res.status(400).json({ error: 'Invalid Username or Password.' });
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (!isMatch) {
                return res.status(400).json({ error: "Invalid Username or Password." });
            } else {
                // success login ... Generating jwt for auth

                let refreshToken = jwt.sign({
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                }, process.env.JWT_REFRESH_SECRET, { algorithm: 'RS256' });

                jwt.sign({
                    _id: user._id,
                    email: user.email,
                },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: 3600
                    }, (err, token) => {
                        if (err) throw err;
                        return res.status(200).json({
                            token,
                            refreshToken,
                            user: {
                                _id: user._id,
                                email: user.email,
                            },
                            message: "LogIn successfully"
                        });
                    });
            }
        })
    });
}
