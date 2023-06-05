const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,resp){
   resp.sendFile(__dirname+"/index.html")
})





app.post("/",function(req,resp){
const cityName = req.body.city
const apiKey="48608ee41f1c98b99e2a3d7e0f6a4c01"
const unit ="metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apiKey+"&units="+unit+""

https.get(url,function(response){
    response.on("data",function(data){
        const weatherData=JSON.parse(data)
        const icon = weatherData.weather.icon
        const imgURL = "https://openweathermap.org/img/wn/"+ icon +"@2x.png"
        resp.write("<h1>The temp in "+ weatherData.name+" is " + weatherData.main.temp + " celcius </h1>")
        resp.write("<h3>Feels like "+ weatherData.weather.description +" and Humidity is : "+ weatherData.main.humidity +"</h3>")
        resp.write("<img src="+ imgURL +" alt=''/>")
        
        resp.send()
    })
})
})

app.listen(3000,function(){
    console.log('server is running on port 3000')
})