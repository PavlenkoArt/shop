const Router = require('express')
const router = new Router()
const materialRouter = require('./materialRouter')
const userRouter = require('./userRouter')
const manufacturerRouter = require('./manufacturerRouter')
const typeRouter = require('./typeRouter')


router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/manufacturer', manufacturerRouter)
router.use('/material', materialRouter)

module.exports = router