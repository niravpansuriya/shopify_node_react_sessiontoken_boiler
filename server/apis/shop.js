const errors = require("../config/error");
const Shop = require("../model/Shop");

//----------------------------------------------------------------------------------

const verifyApp = async (ctx) => {
    try {

        const { shop } = ctx.state;

        if (!shop) {
            ctx.status = errors.BAD_REQUEST.status;
            const resObj = errors.BAD_REQUEST;
            resObj.message = "shop not found";
            return ctx.body = resObj;
        }

        // find data in database
        const shopData = await Shop.findOne({ shop });

        if (!shopData) {
            ctx.status = errors.BAD_REQUEST.status;
            const resObj = errors.BAD_REQUEST;
            resObj.message = "shop data not found";
            return ctx.body = resObj;
        }

        ctx.status = errors.SUCCESS.status;
        const resObj = errors.SUCCESS;
        resObj.message = "Application is working fine";
        return ctx.body = resObj;

    } catch (error) {
        console.log("error in verifyApp api", error);
        ctx.status = errors.SERVER_ERROR.status;
        return ctx.body = errors.SERVER_ERROR;
    }
}

//----------------------------------------------------------------------------------

module.exports = { verifyApp }