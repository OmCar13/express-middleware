import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

var userIsAuthorized = false;

app.use(bodyParser.urlencoded({
    extended: true
}));

function checkPassword(req, res, next) {
    var password = req.body["password"];
    if (password === "ILoveProgramming") {
        userIsAuthorized = true;
    }
    next();
};

app.use(checkPassword);

app.listen(port, (req, res) => {
    console.log(`Server is running on ${port}`);
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
    if(userIsAuthorized) {
        res.sendFile(__dirname + "/public/secret.html");
    } else {
        res.redirect(__dirname + "/public/index.html");
    }
});