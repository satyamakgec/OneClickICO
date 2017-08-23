var express = require('express');
var bodyParser = require('body-parser');
var env = require("./Backend/config/environment");

var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/UI/ui'));

require('babel-register'); 
require('./Backend/api/route')(app,express);

app.listen(3000,function(err){
	if(err){
		console.log(err);
	}else {
		console.log("listening at 3000 port");
    	}
});

app.get('*',function(req,res){
	res.sendFile( __dirname + '/UI/ui/index.html');
});
