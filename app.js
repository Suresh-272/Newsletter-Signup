const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const  https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req,res){
    res.sendFile(__dirname + "/signup.html")
})

app.post('/', function(req,res){
 
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        'members': [
            {
                email_address: email, 
                status: "subscribed",
                merge_fields: {
                    FNAME : firstName,
                    LNAME : lastName
                }

            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/707ca28408";

    const options = {
        method: "POST",
        auth: "suresh1:b5914c80454c2a3a1c7791f13dd09fbe-us21"
    }

    const request = https.request(url, options, function(response){

        if(response.statusCode == 200){
            res.sendFile(__dirname + "/success.html");
        } else { 
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running...");
})
// API key
// d18ab8329e61cd4706ae3eda310b04d1-us21
// ac8f0b20fa47f83356457c4eb87f0071-us21
// list Id
// 707ca28408
