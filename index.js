const freeProxy = require("./FreeProxy");

(async () => {
    await freeProxy.init();
    await freeProxy.getProxies();
})();