const app = require('express')();

app.use('/', (req, res) => {
    return res.send("tlv 30 degrees");
});

module.exports = (port) => {
    app.listen(port, console.log(`weather service is on port ${port}`));
    return "weather";
}

