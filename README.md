# SHOPIFY APPLICATION BOILER PLATE (KOA/REACT/SESSION_TOKEN)

-   This is the boiler plate for create the application in Shopify

### Steps

-   Clone the boiler plate
-   Fire `npm install`
-   Create `.env` file in root of the project as following...

    ```
    MONGO_URI = <SRV for mongodb database>
    REACT_APP_API_KEY = <Shopify API key>
    API_SECRET_KEY = <Shopify API secret key>
    SCOPES = <Permission scopes of the application> ex. read_products,write_products
    HOST_NAME = <Hostname of the server> ex. https://5df6a235ab62.ngrok.io
    API_VERSION = <Shopify API verison> ex. 2021-04
    PORT = <Port in which one wants to run the node server> ex. 80
    ```

-   Search `###HOOK_TOPICS###` in index.js file in the root and add the webhook topics that one wants to register with application installation.
-   Search `@@@HANDLE_TOPIC@@@` in `server/apis/hooks.js` and make appropriate changes there.
-   Search `@@@DEFINE_HANDLERS@@@` in `server/controllers/hook.js` and make appropriate changes there.
-   Fire `npm start` command to start the server.
-   Now all settings are done, you can define `routes` in `server/routes` and add it into the `index.js` in root. Define apis and controllers according to your needs and develop the creative apps.

## Authors

-   [REENA S. SANGHANI](https://www.linkedin.com/in/reena-sanghani-562007145/) (Front End) (49.99999%)
-   [NIRAV C. PANSURIYA](https://www.linkedin.com/in/nirav-pansuriya-8a4777136/) (Back End) (50.00001%)
