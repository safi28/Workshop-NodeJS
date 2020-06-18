const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username required'],
        validate: {
            validator: function(v) {
                return /[A-Za-z0-9 ].+/.test(v)
            },
            message: props => `${props.value} is invalid username`
        }
    },
    password: {
        type: String,
        required: [true, 'Password required'],
        validate: {
            validator: function(v) {
                return /[A-Za-z0-9 ].+/.test(v)
            },
            message: props => `${props.value} is invalid password`
        }
    }
})

module.exports = mongoose.model('User', userSchema)