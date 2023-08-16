import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import ejs from "ejs";

const _dirName = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
const currentDate = new Date();
const currentDay = currentDate.getDay();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs", { day: currentDay});
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});