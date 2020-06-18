const { Router } = require("express")
const router = Router()
const {saveUser, verifyUser, getUserStatus, guestAccess} = require('../controllers/user')

router.get('/register',getUserStatus, guestAccess, (req, res) => {
    const error = req.query.error ? 'Username or password is invalid': null
    console.log('error', error);
    
    res.render('authentication/registerPage', {
        title: "Register",
        isLogged: req.isLogged,
        error
    })
})

router.get('/login', (req, res) => {
    res.render('authentication/loginPage', {
        title: "Login Page",
        isLogged: req.isLogged
    })
})

router.post('/register', getUserStatus, guestAccess ,async(req, res) => {
    const { username, password } = req.body
    if(!password || password.length < 8 || !password.match(/[A-Za-z0-9 ].+/) || !username.match(/[A-Za-z0-9 ].+/)) {
        console.log('password is invalid');
       return res.redirect('/register?error=true')
    }
    const { error } = await saveUser(req, res)
    console.log(error);
    
    // const status = await saveUser(req, res)
    // if(status) {
    //     return res.redirect('/')
    // }
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