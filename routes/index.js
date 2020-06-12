const { Router } = require("express");
const {  getCubes } = require("../controllers/cubes");
const { getUserStatus } = require('../controllers/user')
const router = Router();

router.get("/", getUserStatus ,async (req, res) => {
  const cubes = await getCubes();
    res.render("index", {
    cubes,
    isLogged: req.isLogged
  });
});

router.get("/about", getUserStatus,(req, res) => {
  res.render("partials/about", {
    title: "About | Cube Workshop",
    isLogged: req.isLogged
  });
});

router.get("*", getUserStatus ,(req, res) => {
  res.render("error/404", {
    title: "Error | Cube Workshop",
    isLogged: req.isLogged
  })
})

module.exports = router;
