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

