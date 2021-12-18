const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
});

app.post('/', function(req, res){
    var fName = req.body.firstName;
    var lName = req.body.lastName;
    const email = req.body.userEmail;

    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                marge_fields: {
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = 'https://us20.api.mailchimp.com/3.0/lists/fd78cdd709';

    const options = {
        method: 'POST',
        auth: 'silvia:d19e4482bd135cae95b62bc7ce0c2d49-us20'
    };

    const request = https.request(url, options, function(response){
        if (response.statusCode === 200) {
            // res.sendFile(__dirname + "/success.html");
            res.sendFile(__dirname + '/success.html')
        } else {
            res.sendFile(__dirname + "/failure.html");
        };


        response.on('data', function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
     
});



app.listen(process.env.PORT || 3000, function(){
    console.log('Server started.');
});

// MailChimp apiKey
// d19e4482bd135cae95b62bc7ce0c2d49-us20

// audiance key/list id
// fd78cdd709