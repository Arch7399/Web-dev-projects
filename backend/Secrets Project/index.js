import express from "express";
import {dirname} from "path";
import {fileURLToPath} from "url";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const _dirName = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({extended: true}));

function pwdValidator(req, res, next) {
    if(req.body["password"] === "ILoveProgramming"){
        res.sendFile(_dirName + "/public/secret.html");
    } else {
        res.sendFile(_dirName + "/public/index.html");
    }
    next();
}

app.use(pwdValidator);

app.get("/", (req, res) => {
    res.sendFile(_dirName + "/public/index.html");
});

app.post("/check", (req, res) => {
    console.log(req.body);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
