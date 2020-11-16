const mongoose = require('mongoose');

const UserSChema = new mongoose.Schema({
    name: {
        type: String,
        require: True
    },
    email: {
        type: String,
        require: True
    },
    password: {
        type: String,
        require: True
    },
    password: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User', UserSChema)

module.exports = User;