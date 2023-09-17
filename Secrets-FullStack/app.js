//jshint esversion:6
import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import _ from "lodash";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://0.0.0.0:27017/userAuthDB");

const userSchema = {
    username: String,
    password: String
};

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

app.post("/register", (req, res) => {
    const userName = _.lowerCase(req.body.username);
    const passWord = req.body.password;

    Credentials.findOne({username: userName}).then(function(foundName){
        if(foundName){
            console.log("This username is already taken...");
        } else {
            const newUser = new Credentials({
                username: userName,
                password: passWord
            });
            newUser.save();
            console.log("User registered successfully..!");
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});