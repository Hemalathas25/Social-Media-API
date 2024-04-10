const express = require('express');

const {
    getAllUser,
    getOneUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/user.js');

const router = express.Router();

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