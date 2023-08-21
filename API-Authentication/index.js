import express from "express";
import axios from "axios";

const app = express();
const port = 3001;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "arch7399";
const yourPassword = "archimonde";
const yourAPIKey = "d9c41e4d-d1df-4e74-9799-671b9415f153";
const yourBearerToken = "c3d8d04b-13ef-4024-8b89-e9930259b449";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(API_URL+"random");
    const result = response.data;
    res.render("index.ejs", { content: JSON.stringify(result)});
  } catch (error) {
    res.render("index.ejs", {error: error.message})
    console.log(error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const response = await axios.get(API_URL+"all?page=2", {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    const result = response.data;
    res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    res.render("index.ejs", {error: error.message})
    console.log(error.message);
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const response = await axios.get(API_URL+"filter?score=5&apiKey="+yourAPIKey);
    console.log(API_URL+"filter?score=5&apiKey="+yourAPIKey);
    const result = response.data;
    res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    res.render("index.ejs", {error: error.message})
    console.log(error.message);
  }
});

app.get("/bearerToken", async (req, res) => {
  try {
    const response = await axios.get(API_URL+"secrets/42", {
      headers: {
        Authorization: `bearer ${yourBearerToken}`,
      },
    });
    const result = response.data;
    res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    res.render("index.ejs", {error: error.message})
    console.log(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
