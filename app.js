const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res) {
    const url = "https://shortstories-api.herokuapp.com";
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const storyData = JSON.parse(data);
            const storyTitle = storyData.title;
            const storyAuthor = storyData.author;
            const storyText = storyData.story;
            res.write("<h1>" + storyTitle + "</h1>");
            res.write("<h3>by " + storyAuthor + "</h3>");
            res.write("<p>" + storyText + "</p>");
            res.send();
        })
    })
})

app.listen(3000, function () {
    console.log("Server is running on port 3000");
})