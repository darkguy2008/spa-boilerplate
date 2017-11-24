import { enableProdMode } from "@angular/core";

if (process.env.NODE_ENV !== 'production') {
    var sNew = document.createElement("script");
    sNew.async = true;
    sNew.src = `http://${(location.host || 'localhost').split(':')[0]}:35729/livereload.js?snipver=1`;
    var s0 = document.getElementsByTagName('script')[0];
    s0.parentNode.insertBefore(sNew, s0);
    require("zone.js/dist/long-stack-trace-zone");
    require('../index.html');
} else
    enableProdMode();
