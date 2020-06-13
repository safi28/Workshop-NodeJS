const { Router } = require("express");
const Cube = require('../models/cube')
const { getCube } = require('../controllers/cubes')
const { authAccess, getUserStatus } = require('../controllers/user')
const jwt = require('jsonwebtoken')
const router = Router()

const privateKey = 'secret_key'

router.get("/create", authAccess, getUserStatus, (req, res) => {
    res.render("create", {
      title: "Create Cube | Cube Workshop",
      isLogged: req.isLogged
    })
  })
  
  router.post("/create", authAccess, (req, res) => {
    const { name, description, imageUrl, difficulty } = req.body;
    const token = req.cookies['auth_cookie']
    const decodedObject = jwt.verify(token, privateKey)

    const cube = new Cube({name, description, imageUrl, difficulty, creatorId: decodedObject.userID})
    cube.save()
    res.redirect('/')
  })
  
  router.get("/details/:id", getUserStatus , async (req, res) => {
    const cube = await getCube(req.params.id)
    const token = req.cookies['auth_cookie']
    
    if(token) {
    const decodedObject = jwt.verify(token, privateKey)
    const user = decodedObject.userID
    const findCreator = cube.creatorId
    if(user === findCreator) {
      req.creator = true
    } else {
      req.creator = false
    }
    }    
    res.render("details", {
      ...cube,
      isLogged: req.isLogged,
      creator: req.creator
    })
  })

  router.get('/edit/:id', getUserStatus, authAccess, async (req, res) => {
    const cube = await getCube(req.params.id);
    res.render('edit', {
      title: 'Edit Page',
      isLogged: req.isLogged,
      ...cube
    })
  })

  router.post('/edit/:id', getUserStatus, authAccess, async(req, res) => {
    const { name, description, imageUrl, difficulty } = req.body
    const id = req.params.id;
    await Cube.updateOne({_id: id}, {name, description, imageUrl, difficulty} )
    res.redirect('/')
  })

  module.exports = router