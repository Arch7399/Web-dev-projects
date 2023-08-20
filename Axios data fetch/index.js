import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
let typeEp, participantEp;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  console.log(req.body);
  switch (req.body.type) {
    case "education":
      typeEp = "education";
      break;

    case "charity":
      typeEp = "charity";
      break;

    case "recreational":
      typeEp = "recreational";
      break;

    case "relaxation":
      typeEp = "relaxation";
      break;

    case "busywork":
      typeEp = "busywork";
      break;

    case "social":
      typeEp = "social";
      break;

    case "diy":
      typeEp = "diy";
      break;

    case "music":
      typeEp = "music";
      break;

    case "":
      typeEp = "";
      break;

    default:
      break;
  }

  switch (req.body.participants) {
    case "1":
      participantEp = "1";
      break;

    case "2":
      participantEp = "2";
      break;

    case "3":
      participantEp = "3";
      break;

    case "4":
      participantEp = "4";
      break;

    case "":
      participantEp = "";
      break;

    default:
      break;
  }

  try {
    const filterEp = await axios.get(
      `https://bored-api.appbrewery.com/filter?type=${typeEp}&participants=${participantEp}`
    );
    const resultEp = filterEp.data;
    console.log(resultEp);
    res.render("index.ejs", {
      data: resultEp[Math.floor(Math.random() * resultEp.length)],
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
