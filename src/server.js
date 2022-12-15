import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import bodyParser from 'body-parser';
const router = express.Router();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/.netlify/functions/index', router);

// var corsOptions = {
//   origin: "https://stately-sawine-318119.netlify.app"
// };
//
// app.use(cors(corsOptions));
//
// // parse requests of content-type - application/json
// app.use(express.json());
//
// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to dechet application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
