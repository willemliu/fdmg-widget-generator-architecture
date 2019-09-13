module.exports = {
    serverRuntimeConfig: {
        // Will only be available on the server side
        BASE_URL: process.env.BASE_URL,
        SEARCH_URL: process.env.SEARCH_URL,
        WIDGET_URL: process.env.WIDGET_URL,
    },
    env: {
        BASE_URL: process.env.BASE_URL,
        SEARCH_URL: process.env.SEARCH_URL,
        WIDGET_URL: process.env.WIDGET_URL,
    },
};
