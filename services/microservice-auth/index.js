const express = require('express');
const app = express();

app.use('/', (req, res) => {
    return res.send("authenticated");
});

module.exports = (port) => {
    app.listen(port, console.log(`auth service is on port ${port}`));
    return "auth";
}

