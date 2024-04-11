const ErrorResponse = require('../utils/errorResponse.js');
const bcrypt = require('bcryptjs');
const asyncHandler = require('../middleware/async.js');
const User = require('../models/user.js');

/**   
 *  @desc   Register user
 *  @route  GET/api/register
 *  @access public 
 */

exports.register =  asyncHandler(async (req, res, next) => {
    const { name, email, username, password, gender, dateOfBirth } = req.body;

    console.log("Password:", password); // Check the value of password

    // Check if password is undefined
    if (typeof password !== 'string') {
        return res.status(400).json({ error: 'Invalid password' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create User 
    const user = await User.create({
        name,
        email,
        username,
        password: hashedPassword, // Store hashed password in the database
        gender, 
        dateOfBirth
    });

    // Create Token
    const token = user.getSignedJwtToken();

    res.status(200).json({ success: true, token });
});

/**   
 *  @desc   Get all users 
 *  @route  GET/api
 *  @access public 
 */

exports.getAllUser = (req, res, next) => {
    res
    .status(200)
    .json({ name: 'Hem', hello: req.hello});
}

/**   
 *  @desc   Get one users
 *  @route  GET/api/:id
 *  @access public 
 */

exports.getOneUser = (req, res, next) => {
    res
    .status(200)
    .json({ name: 'Hema'});
}

/**   
 *  @desc   Create new user
 *  @route  POST/api
 *  @access private
 */

exports.createUser = (req, res, next) => {
    res
    .status(200)
    .json({ name: 'Hem'});
}


/**   
 *  @desc   Update user
 *  @route  PUT/api/:id
 *  @access private
 */

exports.updateUser = (req, res, next) => {
    res
    .status(200)
    .json({ name: 'Hem', msg: `Update ${req.params.id}`});
}


/**   
 *  @desc   Delete user
 *  @route  DELETE/api/:id
 *  @access private
 */

exports.deleteUser = (req, res, next) => {
    res
    .status(200)
    .json({ name: 'Hem', msg: `Delete ${req.params.id}`});
}

