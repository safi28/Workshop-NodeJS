const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const privateKey = 'secret_key'

const generateToken =  (data) => {
    const token = jwt.sign(data, privateKey)
    return token
}

const saveUser = async (req, res) => {
    const { username, password } = req.body

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new User({username, password: hashedPassword})
    const userObject = user.save()

    const token = generateToken({
        userID: userObject._id,
        username: userObject.username
    })
    res.cookie('auth_cookie', token)
    return true
}

const verifyUser = async(req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({username})
    const status = await bcrypt.compare(password, user.password)

    if(status) {
      const token = generateToken({
        userID: user._id,
        username: user.username
    })
        res.cookie('auth_cookie', token)
    }
}

const getUserStatus = (req, res, next) => {    
    const token = req.cookies['auth_cookie']
    
    if(!token) {
        req.isLogged = false
    }
    try {
      jwt.verify(token, privateKey)
      req.isLogged = true
    } catch(e) {
        req.isLogged = false        
    }
    next()
}

const guestAccess = (req, res, next) => {
    const token = req.cookies['auth_cookie']
    if(token) {
        return res.redirect('/')
    }
    next()
}

const authAccess = (req, res, next) => {
    const token = req.cookies['auth_cookie']
    if(!token) {
        return res.redirect('/')
    }
    try {
        jwt.verify(token, privateKey)
        next()
      } catch(e) {
          return res.redirect('/')
      }
}

module.exports = {
    saveUser,
    verifyUser,
    getUserStatus,
    guestAccess,
    authAccess
}