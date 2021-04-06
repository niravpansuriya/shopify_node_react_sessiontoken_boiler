/**
 * This module contains the apis for the hooks
 */

//----------------------------------------------------------------------------------

const hookControllers = require("../controllers/hook");

//----------------------------------------------------------------------------------

/**
 * This api handles all Shopify webhook calls
 */
const handleWebHook = async (ctx) => {
    try {

        // fetch topic and store name from the req header
        const topic = ctx.headers["x-shopify-topic"];
        const shop = ctx.headers["x-shopify-shop-domain"];

        if (!topic || !shop) {
            ctx.status = 200;
            return ctx.body = { status: 200, message: "SUCCESS" }
        }

        // @@@HANDLE_TOPIC@@@
        /**
         * Add web hooks topic in case and call the handler for that hook (make sure to add topic that are
         * defined in the Shopify)
         */
        switch (topic) {
            case ("app/uninstalled"):
                await hookControllers.handleShopUninstall(shop);
        }

        ctx.status = 200;
        return ctx.body = { status: 200, message: "SUCCESS" }
    } catch (error) {
        ctx.status = 200;
        return ctx.body = { status: 200, message: "SUCCESS" }
    }
}

//----------------------------------------------------------------------------------

module.exports = { handleWebHook }