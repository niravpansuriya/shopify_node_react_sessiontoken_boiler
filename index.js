require("dotenv").config();
require("isomorphic-fetch");
const ShopifyApi = require("@shopify/shopify-api");
const koaAuth = require("@shopify/koa-shopify-auth");
const Koa = require("koa");
const chalk = require("chalk");
const session = require("koa-session");
const send = require("koa-send");
const Router = require("koa-router");
const path = require("path");
const serve = require("koa-static");
const cors = require("koa-cors");
const bodyparser = require("koa-bodyparser");

//----------------------------------------------------------------------------------


const connectDB = require("./server/db/connect");
const Shop = require("./server/model/Shop");
const errors = require("./server/config/error");
const shopControllers = require("./server/controllers/shop");
const verifyRouter = require("./server/routers/verify");
const hookRouter = require("./server/routers/hook");
const hookControllers = require("./server/controllers/hook")

//----------------------------------------------------------------------------------

/**
 * Variables
 */

const {
    REACT_APP_API_KEY: apiKey,
    API_SECRET_KEY: apiSecret,
    SCOPES: scopes, HOST_NAME: hostName,
    API_VERSION: apiVersion,
    PORT: port
} = process.env;

global.ACTIVE_SHOPIFY_SHOPS = {};

// ###HOOK_TOPICS###
// Add topics of Shopify webhooks that one wants 
// to register with application installation, in this array
global.hooks = ["APP_UNINSTALLED"]

const buildPath = path.join(__dirname, "build");

//----------------------------------------------------------------------------------


/**
 * init Shopify object
 */

ShopifyApi.Shopify.Context.initialize({
    REACT_APP_API_KEY: apiKey,
    API_SECRET_KEY: apiSecret,
    SCOPES: scopes,
    HOST_NAME: hostName.replace(/https:\/\//, ""),
    API_VERSION: apiVersion,
    IS_EMBEDDED_APP: true,
    // This should be replaced with your preferred storage strategy
    SESSION_STORAGE: new ShopifyApi.Shopify.Session.MemorySessionStorage(),
});


//----------------------------------------------------------------------------------

/**
 * Server
 */

// create a server
const server = new Koa();
server.keys = [ShopifyApi.Shopify.Context.API_SECRET_KEY];

server.use(cors());
server.use(bodyparser());

// auth and callback auth routers
server.use(koaAuth.default({
    accessMode: 'offline',
    async afterAuth(ctx) {
        try {

            // this data is sent by Shopify after auth
            const { shop, accessToken, scope } = ctx.state.shopify;
            ACTIVE_SHOPIFY_SHOPS[shop] = scope;

            if (accessToken) {

                // get shop data from Shopify
                const shopifyData = await shopControllers.getShopData(shop, accessToken);

                // this object will be updated or created into the Shop collection
                const newData = {
                    shop: shop,
                    accessToken,
                    phone: shopifyData.phone,
                    country_code: shopifyData.country_code,
                    country_name: shopifyData.country_name,
                    accessScope: scopes,
                    domain: shopifyData.domain,
                    primary_locale: shopifyData.primary_locale,
                    email: shopifyData.email,
                    customer_email: shopifyData.customer_email,
                    money_format: shopifyData.money_format,
                    currency: shopifyData.currency,
                    timezone: shopifyData.iana_timezone,
                    appstatus: "installed",
                    address1: shopifyData.address1,
                    address2: shopifyData.address2,
                    zip: shopifyData.zip,
                    city: shopifyData.city,
                    shop_owner: shopifyData.shop_owner,
                    latitude: shopifyData.latitude,
                    longitude: shopifyData.longitude,
                    webHookHost: hostName
                };

                // get shop data from database
                const shopData = await Shop.findOne({ shop });

                // this is variable stores whether given store is new or not for application
                var isNewShop = false;

                // this one will be store the old webhook host for the store
                var oldHost = hostName;

                if (shopData) {

                    // get old hostname of webhooks from data base for the store
                    oldHost = shopData.webHookHost;
                    if (shopData.accessToken !== accessToken) {

                        // app is reinstalled
                        isNewShop = true;
                        await Shop.updateOne({ shop }, { $set: newData });
                    }
                } else {

                    // the store is new for our application
                    isNewShop = true;

                    // create the document for the store in Shop collection
                    const SHOP = new Shop(newData);
                    await SHOP.save();
                }

                try {
                    /** 
                     * This controller will do following tasks
                     * If store is new for the application, then register defined webhooks in global.hooks
                     * If app is reinstalled into the store, it will register the hooks
                     * If hostname is changes in the server, then it will remove the old webhooks and 
                     * will install the new hooks with new hostname
                     */
                    await hookControllers.syncWebhooks(shop, accessToken, oldHost, isNewShop);
                } catch (error) {
                }

                // redirect to the frontend
                ctx.redirect(`/?shop=${shop}`);

            } else {

                // if access token not found
                ctx.status = errors.BAD_REQUEST.status;
                const resObj = errors.BAD_REQUEST;
                resObj.message = "access token not found"
                return ctx.body = resObj
            }

            return ctx.redirect(`/?shop=${shop}`);
        } catch (error) {
            console.log("error in after auth", error);
            ctx.status = errors.SERVER_ERROR.status;
            return ctx.body = errors.SERVER_ERROR
        }
    },
}))

server.use((new Router().get("/", async (ctx) => {
    const shop = ctx.query.shop;

    // This shop hasn't been seen yet, go through OAuth to create a session
    if (global.ACTIVE_SHOPIFY_SHOPS[shop] === undefined) {
        return ctx.redirect(`/auth?shop=${shop}`);
    } else {
        return send(ctx, "index.html", { root: buildPath })
    }
})).routes())

// make front end public
server.use(serve(buildPath));

server.use(verifyRouter);

// This contains the hook api
server.use(hookRouter);

server.use((new Router().get("(.*)", koaAuth.verifyRequest(), async (ctx) => {
    return send(ctx, "index.html", { root: buildPath })
})).routes());

//----------------------------------------------------------------------------------

/**
 * start the server
 */

// connect the db and start the server
connectDB().then((res) => {
    server.listen((port), () => {
        console.log(chalk.blue.inverse(`server is runnig on port ${port}`));
    })
})