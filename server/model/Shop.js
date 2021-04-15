/**
 * This module contains model for Shop
 *  */

// ---------------------------------------------------------------------------

/**
 * import modules
 */

// this is the driver for mongodb
const mongoose = require("mongoose");

// ---------------------------------------------------------------------------

/**
 * Schema
 */

const shopSchema = mongoose.Schema({
    shop: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    accessToken: {
        type: String,
        trim: true,
        required: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    country_code: {
        type: String,
        trim: true,
        required: true,
    },
    country_name: {
        type: String,
        trim: true,
        required: true,
    },
    accessScope: {
        type: Array,
        required: true,
    },
    domain: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    customer_email: {
        type: String,
        trim: true,
        required: true,
    },
    money_format: {
        type: String,
        trim: true,
        required: true,
    },
    currency: {
        type: String,
        trim: true,
        required: true,
    },
    timezone: {
        type: String,
        trim: true,
        required: true,
    },
    appstatus: {
        type: String,
        trim: true,
        default: "installed",
        enum: ["installed", "uninstalled"],
    },
    webHookHost: {
        type: String,
        trim: true,
        require: true
    }
    , updatedAt: {
        type: Number,
    },
    createdAt: {
        type: Number,
    }
}, {

    timestamps: {
        currentTime: () => Date.now()
    }
});

// ---------------------------------------------------------------------------

/**
 * create a model
 */

// create shop model
const SHOP = mongoose.model("shop", shopSchema);

// ---------------------------------------------------------------------------

/**
 * export modules
 */

module.exports = SHOP;