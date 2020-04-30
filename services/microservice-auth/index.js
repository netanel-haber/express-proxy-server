const express = require('express');
const app = express();
require('dotenv').config()

app.use('/',(req,res)=>{
return res.send("hello ec2");
});

export default app;
