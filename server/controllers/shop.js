const axios = require("axios");

//----------------------------------------------------------------------------------

const Shop = require("../model/Shop");
const { API_VERSION: apiVersion } = process.env;

//----------------------------------------------------------------------------------


/**
 * This controller verify the payload got by decrypting the session token
 * @param {Object} payload Object that contains payload got from session token decryption
 * @returns {Bookean} true if payload is correct, else false
 */
const verifyToken = (payload) => {
    const { exp, nbf, iss, dest, aud } = payload;
    const currentTimeStep = Math.floor(Date.now() / 1000);
    if (currentTimeStep > exp || currentTimeStep < nbf || !iss.includes(dest) || aud !== process.env.API_KEY) return false;
    return true;
}

/**
 * This controller gives the store data fatched from the Shopfiy
 * @param {String} shop store url
 * @param {String} accessToken access token of the store
 * @returns {Object} data that contains store information
 */
const getShopData = async (shop, accessToken) => {
    return new Promise(async (resolve, reject) => {
        try {

            // url and headers for GET store shopify api
            const url = `https://${shop}/admin/api/${apiVersion}/shop.json`;
            const headers = {
                "X-Shopify-Access-Token": accessToken,
            };

            const res = await axios({
                method: "GET",
                headers,
                url,
                responseType: "json",
            })

            return resolve(res.data.shop);

        } catch (error) {
            return reject(new Error(error));
        }
    })
}

/**
 * 
 * @param {String} shop shop url
 * @returns {String} access token
 */
const getAccessToken = async (shop) => {
    return new Promise((resolve, reject) => {
        try {

            if (!shop) return reject(new Error("invalid shop parameter"));

            const shopData = await Shop.findOne({ shop, status: "installed" }).select(["accessToken"]);

            if (!shopData) return reject(new Error("shop data not found in database"));

            return resolve(shopData.accessToken);

        } catch (error) {
            return reject(error);
        }
    })
}


//----------------------------------------------------------------------------------

module.exports = { getShopData, verifyToken, getAccessToken }