/**
 * These are the test router
 */

//----------------------------------------------------------------------------------

const Router = require('koa-router');

//----------------------------------------------------------------------------------

const shopMiddleware = require("../middleware/shop");
const shopApis = require("../apis/shop")

const router = new Router({
    prefix: "/api/app"
})

//----------------------------------------------------------------------------------

/**
 * POST
 */
router.post("/verify", shopMiddleware.verifyUser, shopApis.verifyApp)

//----------------------------------------------------------------------------------

module.exports = router.routes();