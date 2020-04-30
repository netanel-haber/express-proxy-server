
const app = require('express')();

const proxy = require('express-http-proxy');
const proxyConfig = {
    proxyReqPathResolver(req) {
        var parts = req.url.split('/');
        return parts.slice(2).join('');
    }
};


const getServices = (path) => require('fs').promises.readdir(path)



const getPort = require('get-port');
const getPorts = async (n) => {
    const ports = [];
    while (n--) ports.push(await getPort());
    return ports;
}



const path = require('path');
const servicesPath = path.join(__dirname, '..', 'services');
(async () => {
    const mainPort = process.env.port || 8080;
    const services = await getServices(servicesPath);
    const servicePorts = await getPorts(services.length);

    services.forEach((s, index) => {
        const port = servicePorts[index];
        require(path.join(servicesPath, s)).listen(port, () => {
            console.log(`service ${s} is up on port ${port}`)
        });
        app.use(s, proxy(`localhost:${port}`, proxyConfig))
    });

    app.listen(mainPort, () => {
        console.log(`proxy is up on port ${mainPort}`);
    })
})()
