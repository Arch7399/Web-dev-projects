import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import _ from "lodash";
import encrypt from "mongoose-encryption";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://0.0.0.0:27017/userAuthDB");

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const secret = "maadupattunim";

userSchema.plugin(encrypt, {secret: secret, encryptedFields: ["password"]});

const Credentials = mongoose.model("credentials", userSchema);

app.get("/", (req, res) => {
    res.render("home",{});
});

app.get("/login", (req, res) => {
    res.render("login",{});
});

app.get("/register", (req, res) => {
    res.render("register",{});
});

app.get("/secrets", (req, res) => {
    res.render("secrets",{});
});

app.post("/register", (req, res) => {
    const userName = _.lowerCase(req.body.username);
    const passWord = req.body.password;

    Credentials.findOne({username: userName}).then(function(foundName){
        if(foundName){
            console.log("This username is already taken...");
            res.redirect("/register");
        } else {
            const newUser = new Credentials({
                username: userName,
                password: passWord
            });
            newUser.save();
            console.log("User registered successfully..!");
            res.redirect("/secrets");
        }
    });
});

app.post("/login", (req, res) => {
    const userName = _.lowerCase(req.body.username);
    const passWord = req.body.password;

    Credentials.findOne({username: userName}).then(function(foundName){
        if(foundName){
            if(foundName.password === passWord){
                console.log("User logged in successfully..!");
            res.redirect("/secrets");
            } else {
                console.log("Wrong Password");
                res.redirect("/login");
            }
        } else {
            console.log("Wrong credentials");
            res.redirect("/login");
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});