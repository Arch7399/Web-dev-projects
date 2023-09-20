import bcrypt, { hash } from "bcrypt";
import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import _ from "lodash";

const app = express();
const port = 3000;
const saltRounds = 10;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://0.0.0.0:27017/userAuthDB");

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

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

    bcrypt.hash(passWord, saltRounds, function(err, hash){
        Credentials.findOne({username: userName}).then(function(foundName){
            if(foundName){
                console.log("This username is already taken...");
                res.render("register");
            } else {
                const newUser = new Credentials({
                    username: userName,
                    password: hash
                });
                newUser.save();
                console.log("User registered successfully..!");
                res.render("secrets");
            }
        });
    });
});

app.post("/login", (req, res) => {
    const userName = _.lowerCase(req.body.username);
    const passWord = req.body.password;

    Credentials.findOne({username: userName}).then(function(foundName){
        if(foundName){
            bcrypt.compare(passWord, foundName.password, function(err, result){
                if(result === true){
                    console.log("User logged in successfully..!");
                    res.render("secrets");
                } else {
                    console.log("Wrong Password");
                    res.render("login");
                }
            });
        } else {
            console.log("Wrong credentials");
            res.render("login");
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});