const express = require('express');

const {
    register,
    getAllUser,
    getOneUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/auth.js');

const router = express.Router();

router.post('/', register);

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