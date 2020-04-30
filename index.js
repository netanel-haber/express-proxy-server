const getPort = require('get-port');
const fs = require('fs/promises');
const express = require('express');
const app = express();
const proxy = require('express-http-proxy');
const proxyConfig = {
    proxyReqPathResolver(req) {
        var parts = req.url.split('/');
        return parts.slice(2).join('');
    }
};


const getServices = (path) => fs.readdir(path)
const getPorts = async (n) => {
    const ports = [];
    while (n--) ports.push(await getPort());
    return ports;
}
const mapServiceToPort = (services, ports, service) => {
    return ports[services.findIndex(s => s === service)];
}




(async () => {
    const mainPort = await getPort();
    const services = await getServices('services');
    const servicePorts = await getPorts(services.length);

    services.forEach(s => {
        const port = mapServiceToPort(services, servicePorts, service);
        require(s).listen(port,()=>{
            console.log(`service ${s} is up on port ${port}`)
        });
        app.use(s, proxy(`localhost:${port}`,proxyConfig))
    });

    app.listen(mainPort,()=>{
        console.log(`proxy is up on port ${mainPort}`);
    })
})()
