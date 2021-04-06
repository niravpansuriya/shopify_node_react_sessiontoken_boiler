/**
 * These are the hook routers
 */

//----------------------------------------------------------------------------------

const Router = require('koa-router');

//----------------------------------------------------------------------------------

const hookApis = require("../apis/hook")
const router = new Router({
    prefix: "/api/hook"
})

//----------------------------------------------------------------------------------

/**
 * POST
 */
router.post("/", hookApis.handleWebHook)

//----------------------------------------------------------------------------------

module.exports = router.routes();