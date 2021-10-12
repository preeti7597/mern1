const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

dotenv.config({ path: "./config.env"});
require ("./db/conn");

app.use(express.json());
app.use(cookieParser());

app.use(require("./router/auth"));

const port = process.env.PORT || 5000;

//--------------------------3-step heroku------------------------//
 
if (process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
}

app.listen(port, () => {
    console.log(`connecting to port ${port}`);
})