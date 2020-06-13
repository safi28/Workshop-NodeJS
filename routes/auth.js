const { Router } = require("express")
const router = Router()
const {saveUser, verifyUser, getUserStatus, guestAccess} = require('../controllers/user')

router.get('/register',getUserStatus, guestAccess, (req, res) => {
    res.render('authentication/registerPage', {
        title: "Register",
        isLogged: req.isLogged
    })
})

router.get('/login', (req, res) => {
    res.render('authentication/loginPage', {
        title: "Login Page",
        isLogged: req.isLogged
    })
})

router.post('/register', getUserStatus, guestAccess ,async(req, res) => {
    const status = await saveUser(req, res)
    if(status) {
        return res.redirect('/')
    }
    res.redirect('/login')
})

router.post('/login', async(req, res) => {
    const status = await verifyUser(req, res)
    if(status) {
        return res.redirect('/')
    }
    res.redirect('/')
})

router.get('/logout', (req, res) => {
    res.clearCookie('auth_cookie')
    req.isLogged = false
    res.redirect('/')
})

module.exports = router