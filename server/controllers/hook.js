/**
 * These module contains the controllers for the webhooks
 */

//----------------------------------------------------------------------------------

const axios = require("axios");
const { registerWebhook } = require("@shopify/koa-shopify-webhooks");

//----------------------------------------------------------------------------------

const Shop = require("../model/Shop")
const { HOST_NAME: hostName, API_VERSION: apiVersion } = process.env;

//----------------------------------------------------------------------------------

/**
 * This controller will do following things...
 * If store is new for the application, then register defined webhooks in global.hooks
 * If app is reinstalled into the store, it will register the hooks
 * If hostname is changes in the server, then it will remove the old webhooks and 
 * will install the new hooks with new hostname
 * @param {String} shop store url
 * @param {String} accessToken access token for the store
 * @param {String} oldHost current webhook hostname for the store
 * @param {Boolean} isNewInstall true if store is new for application, else false
 * @returns {Promise}
 */
const syncWebhooks = async (shop, accessToken, oldHost, isNewInstall) => {
    return new Promise(async (resolve, reject) => {

        try {
            // if isNewInstall is true, then create all webhooks
            if (isNewInstall) {
                try {
                    // register all webhooks defined in global.hooks
                    await createWebHooks(shop, accessToken);
                } catch (error) {
                    console.log("error in createWebhooks", error);
                }
            }
            else {
                // if host name is changed
                if (oldHost !== hostName) {
                    // delete all webhooks
                    try {
                        // delete all hooks those are registred with this application
                        await deleteAllWebhooks(shop, accessToken);
                    } catch (error) {
                        console.log("error in deleteAllWebhooks", error);
                    }

                    try {
                        // register all webhooks defined in global.hooks
                        await createWebHooks(shop, accessToken);
                    } catch (error) {
                        console.log("error in createWebHooks", error);
                    }
                }
            }
            return resolve();
        } catch (error) {
            return reject(new Error(error));
        }
    })
}

/**
 * This controller will register all hooks those are defined in global.hooks
 * @param {String} shop store url
 * @param {String} accessToken access token for the store
 * @returns {Promise}
 */
const createWebHooks = async (shop, accessToken) => {
    return new Promise(async (resolve, reject) => {

        // get hook topics
        const hooks = global.hooks;

        try {
            for (const hook of hooks) {
                try {
                    // register hook
                    await createWebHook(shop, accessToken, hook);
                } catch (error) {
                    console.log("error in createWebHook", error);
                }
            }

            return resolve();
        } catch (error) {
            return reject(new Error(error));
        }
    })
}

/**
 * This controller will return ids of registerd hooks
 * @param {string} shop store url
 * @param {string} accessToken store access token
 * @returns {Array} Array of ids
 */
const getWebhookIds = async (shop, accessToken) => {
    return new Promise(async (resolve, reject) => {

        // this will store the ids of the registered hooks
        const ids = [];
        try {

            // url and header for the GET webhook api call
            const url = `https://${shop}/admin/api/${apiVersion}/webhooks.json`;
            const headers = {
                "X-Shopify-Access-Token": accessToken
            }

            // get registerd hooks
            const hooks = (await axios({
                method: "GET",
                url,
                headers
            })).data.webhooks;

            // get ids
            hooks.forEach((hook) => {
                ids.push(hook.id)
            })
        } catch (error) {
        }

        return resolve(ids);
    })
}

/**
 * This controller will delete all the webhooks those are registered with the application
 * @param {String} shop store url
 * @param {String} accessToken access token of the store
 * @returns {Promise}
 */
const deleteAllWebhooks = async (shop, accessToken) => {
    return new Promise(async (resolve, reject) => {
        try {

            // get all webhook ids
            const ids = await getWebhookIds(shop, accessToken);

            // delete all webhooks
            for (const id of ids) {
                try {
                    await deleteWebhook(shop, accessToken, id);
                } catch (error) {
                    console.log("error in deleteWebHook", error);
                }
            }

            return resolve();
        } catch (error) {
            return reject(new Error(error));
        }
    })
}

/**
 * This controller will delete the webhook with hook id
 * @param {String} shop store url
 * @param {String} accessToken access token for the store
 * @param {String} id id of the hook that one wants to delete
 * @returns {Promise}
 */
const deleteWebhook = async (shop, accessToken, id) => {
    return new Promise(async (resolve, reject) => {
        try {

            // url and header for DELETE hook api call
            const url = `https://${shop}/admin/api/${apiVersion}/webhooks/${id}.json`;
            const headers = {
                "X-Shopify-Access-Token": accessToken
            }

            // delete the webhook
            await axios({
                method: "DELETE",
                url,
                headers
            })

            return resolve();
        } catch (error) {
            return reject(new Error(error));
        }
    })
}

/**
 * This controller will register the hook with given topic
 * @param {String} shop store url
 * @param {String} accessToken access token for the store
 * @param {String} topic topic of the webhook
 * @returns {Promise}
 */
const createWebHook = async (shop, accessToken, topic) => {
    return new Promise(async (resolve, reject) => {
        try {

            // This module will register webhook in Shpify with given topic
            await registerWebhook({
                address: `${hostName}/api/hook`,
                topic,
                accessToken,
                shop,
                apiVersion,
            });

            return resolve();
        }
        catch (error) {
            return reject(new Error(error));
        }
    })
}

//----------------------------------------------------------------------------------

// @@@DEFINE_HANDLERS@@@
/**
 * Define handlers for webhooks and call them from server/apis/hooks switch case
 */

/**
 * handlers
 */

/**
 * This handler handles the Store uninstall webhook call
 * @param {String} shop store url
 * @returns {Promise}
 */
const handleShopUninstall = async (shop) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Shop.updateOne({ shop }, { $set: { appstatus: "uninstalled" } })
            delete global.ACTIVE_SHOPIFY_SHOPS[shop];
            return resolve();
        } catch (error) {
            return reject(new Error(error))
        }
    })
}

//----------------------------------------------------------------------------------

module.exports = { handleShopUninstall, syncWebhooks }