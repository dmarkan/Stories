const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");

app.use(express.static("public"));
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
            res.write("<body style='background-image: url(images/background2.jpg); background-size: cover; background-attachment: fixed; background-repeat: no-repeat;'>")
            res.write("<h1 style='text-align:center;color:#fff;font-size:5rem;'>" + storyTitle + "</h1>");
            res.write("<h3 style='text-align:center;color:#fff;;font-size:1.5rem;font-style: italic;'>by " + storyAuthor + "</h3>");
            res.write("<p style='text-align:center;color:#fff;;font-size:0.7rem;margin:0 1rem;'>" + storyText + "</p>");
            res.write("<script>let msg = new SpeechSynthesisUtterance();msg.text = '" + storyText + "';msg.rate = 0.6;window.speechSynthesis.speak(msg); </script>")
            res.send();        
        })
    })
})

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000");
})