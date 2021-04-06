/**
 * This module contains middlewares for shop apis
 */

//----------------------------------------------------------------------------------

const jwt = require("jsonwebtoken");

//----------------------------------------------------------------------------------

const errors = require("../config/error");
const shopControllers = require("../controllers/shop");
const { API_SECRET_KEY: apiKey } = process.env;

//----------------------------------------------------------------------------------

/**
 * 
 * This middleware will verify the session token and store
 * All apis after this middleware, will get the shop name in ctx.state
 */
const verifyUser = async (ctx, next) => {
    try {

        // get header
        var authorization = ctx.request.header.authorization;

        if (!authorization) {
            ctx.status = errors.UNAUTHORIZED.status;
            const resObj = errors.UNAUTHORIZED;
            resObj.message = "authorization token not found";
            return ctx.body = resObj;
        }

        authorization = authorization.replace("Bearer ", "");

        // decrypt the sesison token with application api key
        const payLoad = jwt.verify(authorization, apiKey);

        // verify the payload
        const verified = shopControllers.verifyToken(payLoad);

        if (!verified) {
            ctx.status = errors.UNAUTHORIZED.status;
            const resObj = errors.UNAUTHORIZED;
            resObj.message = "user is not verified";
            return ctx.body = resObj;
        }

        // attach the shop name in ctx.state
        const shop = payLoad.dest.replace("https://", "");
        ctx.state.shop = shop;

        await next();

    } catch (error) {
        console.log("error in verify user middleware", error);
        ctx.status = errors.SERVER_ERROR.status;
        return ctx.body = errors.SERVER_ERROR;
    }
}

//----------------------------------------------------------------------------------

module.exports = { verifyUser };
