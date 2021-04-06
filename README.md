# SHOPIFY APPLICATION BOILER PLATE (KOA/REACT/SESSION_TOKEN)

-   This is the boiler plate for create the application in Shopify

### Steps

-   Clone the boiler plate
-   Fire `npm install`
-   Create `.env` file in root of the project as following...

```
MONGO_URI = <SRV for mongodb database>
API_KEY = <Shopify API key>
API_SECRET_KEY = <Shopify API secret key>
REACT_APP_API_KEY = <Shopify API key>
SCOPES = <Permission scopes of the application> ex. read_products,write_products
HOST_NAME = <Hostname of the server> ex. https://5df6a235ab62.ngrok.io
API_VERSION = <Shopify API verison> ex. 2021-04
PORT = <Port in which one wants to run the node server> ex. 80
```

-   Search `###HOOK_TOPICS###` in index.js file in the root and add the webhook topics that one wants to register with application installation. Make sure to add topics from the following...

    `'APP_UNINSTALLED' | 'APP_SUBSCRIPTIONS_UPDATE' | 'APP_PURCHASES_ONE_TIME_UPDATE' | 'CARTS_CREATE' | 'CARTS_UPDATE' | 'CHECKOUTS_CREATE' | 'CHECKOUTS_DELETE' | 'CHECKOUTS_UPDATE' | 'COLLECTION_LISTINGS_ADD' | 'COLLECTION_LISTINGS_REMOVE' | 'COLLECTION_LISTINGS_UPDATE' | 'COLLECTIONS_CREATE' | 'COLLECTIONS_DELETE' | 'COLLECTIONS_UPDATE' | 'CUSTOMER_GROUPS_CREATE' | 'CUSTOMER_GROUPS_DELETE' | 'CUSTOMER_GROUPS_UPDATE' | 'CUSTOMERS_CREATE' | 'CUSTOMERS_DELETE' | 'CUSTOMERS_DISABLE' | 'CUSTOMERS_ENABLE' | 'CUSTOMERS_UPDATE' | 'DRAFT_ORDERS_CREATE' | 'DRAFT_ORDERS_DELETE' | 'DRAFT_ORDERS_UPDATE' | 'FULFILLMENT_EVENTS_CREATE' | 'FULFILLMENT_EVENTS_DELETE' | 'FULFILLMENTS_CREATE' | 'FULFILLMENTS_UPDATE' | 'ORDER_TRANSACTIONS_CREATE' | 'ORDERS_CANCELLED' | 'ORDERS_CREATE' | 'ORDERS_DELETE' | 'ORDERS_FULFILLED' | 'ORDERS_PAID' | 'ORDERS_PARTIALLY_FULFILLED' | 'ORDERS_UPDATED' | 'PRODUCT_LISTINGS_ADD' | 'PRODUCT_LISTINGS_REMOVE' | 'PRODUCT_LISTINGS_UPDATE' | 'PRODUCTS_CREATE' | 'PRODUCTS_DELETE' | 'PRODUCTS_UPDATE' | 'REFUNDS_CREATE' | 'SHOP_UPDATE' | 'THEMES_CREATE' | 'THEMES_DELETE' | 'THEMES_PUBLISH' | 'THEMES_UPDATE' | 'INVENTORY_LEVELS_CONNECT' | 'INVENTORY_LEVELS_UPDATE' | 'INVENTORY_LEVELS_DISCONNECT' | 'INVENTORY_ITEMS_CREATE' | 'INVENTORY_ITEMS_UPDATE' | 'INVENTORY_ITEMS_DELETE' | 'LOCATIONS_CREATE' | 'LOCATIONS_UPDATE' | 'LOCATIONS_DELETE'`

-   Search `@@@HANDLE_TOPIC@@@` in `server/apis/hooks.js` and make appropriate changes there.
-   Search `@@@DEFINE_HANDLERS@@@` in `server/controllers/hook.js` and make appropriate changes there.
-   Fire `npm state` command to start the server.
-   Now all settings are done, now one can define `routes` in `server/routes` and add it into the `index.js` in root. Define apis and controllers according to your needs and develope the creative apps.

## Authors

-   REENA S. SANGHANI (Front End)
-   NIRAV C. PANSURIYA (Back End)
