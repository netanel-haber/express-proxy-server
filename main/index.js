require('dotenv').config();
const app = require('express')();


const getPort = require('get-port');
const getPorts = async (n) => {
    const ports = [];
    while (n--) ports.push(await getPort());
    return ports;
}

const proxy = require('express-http-proxy');
const proxyConfig = {
    proxyReqPathResolver(req) {
        const parts = req.url.split('/');
        return parts.slice(2).join('');
    }
};


const path = require('path');
const fs = require('fs').promises;


const servicesPath = process.env.SPATH || path.join(__dirname, '..', 'services');
(async () => {
    const mainPort = process.env.PORT || 8080;
    const services = await fs.readdir(servicesPath);
    const servicePorts = await getPorts(services.length);

    let port, servicePath, mountName;
    services.forEach((serverName, index) => {
        port = servicePorts[index];
        servicePath = path.join(servicesPath, serverName);
        mountName = require(servicePath)(port);
        app.use("/" + mountName, proxy(`localhost:${port}`, proxyConfig));
    });

    app.listen(mainPort, () => {
        console.log(`orchestrator is up on port ${mainPort}`);
    })
})()
