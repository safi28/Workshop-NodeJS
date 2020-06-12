const express = require("express")
const indexRouter = require("./routes/index")
const accessoryRouter = require('./routes/accessory')
const cubeRouter = require('./routes/cube')
const authRouter = require('./routes/auth')
const dbConnector = require("./config/db")
const cookieParser = require('cookie-parser')

const app = express()

dbConnector()
  .then(() => {
    const config = require("./config/config")
    require("./config/express")(app)

    app.use(cookieParser())

    app.use('/', accessoryRouter)
    app.use('/', cubeRouter)
    app.use('/', authRouter)
    app.use("/", indexRouter)

    app.listen(
      config.development.port,
      console.log(`Listening on port ${config.development.port}! Now its up to you...`)
    )
  })
  .catch(console.error)