import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", async(req, res) => {
    try {
        const response = await axios("https://api.blockchain.com/v3/exchange/tickers");
        const result = response.data;
        res.render("index.ejs", { content: result });
    } catch (error) {
        res.render("index.ejs", { content: error.response.data });
    }
});

app.listen(port, () => {
    console.log(`Server running on port, ${port}`);
});