const express = require('express');

const {
    register,
    login,
    getAllUser,
    getOneUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/auth.js');

const router = express.Router();

router.post('/', register);
router.post('/login', login);

router
 .route('/')
 .get(getAllUser)
 .post(createUser);

router
 .route('/:id')
 .get(getOneUser)
 .put(updateUser)
 .delete(deleteUser)
 
module.exports = router;