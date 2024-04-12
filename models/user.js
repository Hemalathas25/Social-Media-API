const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const randomize = require('randomatic');

/* name, username, password, dob,bio, website link, gender, photo, video*/

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false,
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
    confirmEmailToken: String,
    isEmailConfirmed: {
      type: Boolean,
      default: false,
    },

    gender: {
        type: String,
        required: true
    },

    // dateOfBirth: {
    //      type: String, 
    //      required: true 
    //     },

    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ],
    },

    bio: { 
        type: String 
    },

    website: {
        type: String,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
             'Please use a valid URL with HTTP or HTTPS'
        ]
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Encrypt password using bcrypt while updating (admin)
UserSchema.pre("findOneAndUpdate", async function (next) {
    if (this._update.password) {
      this._update.password = await bcrypt.hash(this._update.password, 10);
    }
    next();
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
};

// Match user entered password to hashed password in database
// UserSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };
  
// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
    // Log the entered password
    console.log('Entered Password:', enteredPassword);

    // Log the hashed password stored in the database
    console.log('Stored Hashed Password:', this.password);

    // Compare passwords and log the result
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    console.log('Password Match Result:', isMatch);

    return isMatch;
};


// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {

    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');  

     // Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

    // Set expire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

return resetToken;
};


// Generate email confirm token
UserSchema.methods.generateEmailConfirmToken = function (next) {
    // email confirmation token
    const confirmationToken = crypto.randomBytes(20).toString('hex');
  
    this.confirmEmailToken = crypto
      .createHash('sha256')
      .update(confirmationToken)
      .digest('hex');
  
    const confirmTokenExtend = crypto.randomBytes(100).toString('hex');
    const confirmTokenCombined = `${confirmationToken}.${confirmTokenExtend}`;
    return confirmTokenCombined;
};

module.exports = mongoose.model('User', UserSchema);