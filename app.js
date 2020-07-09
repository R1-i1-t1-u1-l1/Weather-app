const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require('dotenv').config();
const https = require("https");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){

  const query = req.body.cityName;
  const v = process.env.variable;
  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+"&appid=" +v+ "&units=" + unit;

  https.get(url,function(response){
      console.log(response.statusCode);

      response.on("data",function(data){
        const data_json = JSON.parse(data);
        console.log(data_json);
        const temp = data_json.main.temp;
        const description = data_json.weather[0].description;
        const icon = data_json.weather[0].icon;

        const image_url = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

        res.write("<h1>The weather is curently "+ description+ "</h1>");
        res.write("<h1>The temperature in "+query+" is "+temp+ " degree celcius.</h1>");
        res.write("<img src=" + image_url + ">");
        res.send();

      });
  });
});



app.listen(process.env.PORT || 3000,function(){
  console.log("Server has started running.");
});
