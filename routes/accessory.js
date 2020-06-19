const { Router } = require("express")
const { attachedAccessories, getAccessories, postAccessories } = require("../controllers/accessories")
const { getCube } = require('../controllers/cubes')
const { authAccess, getUserStatus } = require('../controllers/user')
const Accessory = require('../models/accessory')
const router = Router()

router.get("/create/accessory", authAccess, getUserStatus, async(req, res) => {
  res.render("createAccessory", {
    title: "Create accessory",
    isLogged: req.isLogged,
  })
})

router.post("/create/accessory", authAccess ,async (req, res) => {
  const { name, description, imageUrl } = req.body

  const accessory = new Accessory({
    name,
    description,
    imageUrl,
  })

  await accessory.save()

  res.redirect("/")
})

router.get("/attach/accessory/:id", authAccess, getUserStatus ,async (req, res, next) => {
  const attach = await attachedAccessories(req.params.id)
  const cubes = await getCube(req.params.id)
  try {
    const acccessories = await getAccessories()    
    res.render("attachAccessory", {
      title: "Attach accessory",
      acccessories,
      ...cubes,
      isLogged: req.isLogged,
      attachAccessory: attach
    })
  } catch (err) {
    next(err)
  }
})

router.post("/attach/accessory/:id", async (req, res, next) => {
  const { accessory: accessoryId } = req.body
  const cubeId = req.params.id  
  try {
    await postAccessories(cubeId, accessoryId)
    res.redirect(`/details/${cubeId}`)
  } catch (err) {
    next(err)
  }
})

module.exports = router
