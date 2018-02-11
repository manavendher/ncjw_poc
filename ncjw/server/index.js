var express = require('express');
// var server = require('./server.js');
var app = express();
var path    = require("path");
var bodyParser = require('body-parser');
var session = require('express-session');
// var coder = require('lib/base64-arraybuffer.js');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "ncjw"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
var cors = require('cors')
 
app.use(cors())
app.use(express.static('public'));

app.get('/api/getData', function (req, res) {
 res.send(sessData);
})

app.get('/api/getIData/:id', function (req, res) {

	  con.query("SELECT * FROM categories where parentId="+req.params.id, function (err, result, fields) {
	    if (err) throw err;
	    res.send(result);
	  });


})
app.get('/api/getParent/:id', function (req, res) {

	  con.query("SELECT parentId FROM categories where id="+req.params.id, function (err, result, fields) {
	    if (err) throw err;
	    res.send(result);
	  });


})

app.get('/api/getPrices/:ids', function (req, res) {

	  con.query("SELECT * FROM prices where tier3='"+req.params.ids+"'", function (err, result, fields) {
	    if (err) throw err;
	    res.send(result);
	  });


})




app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({secret: 'ssshhhhh'}));
/**
 * bodyParser.json(options) Parses the text as JSON and exposes the resulting
 * object on req.body.
 */
app.use(bodyParser.json());
var sessData={'empData':[]};
app.post('/api/checkLogin', function(req, res){

	if(req.body.id){
con.query("SELECT count(*) c FROM staff where unique_id="+req.body.id, function (err, result, fields) {
    if (err) throw err;
    res.send(result[0]);

  });
}else{
	res.send({c:0});
}
});


app.post('/api/searchUser', function(req, res){

	if(req.body.phone){
con.query("SELECT * FROM users where phone like '%"+req.body.phone+"%'", function (err, result, fields) {
    if (err) throw err;
    res.send(result);

  });
}
});

app.get('/api/getUserById/:id', function(req, res){

	if(req.params.id){
con.query("SELECT * FROM users where id ="+req.params.id, function (err, result, fields) {
    if (err) throw err;
    res.send(result);

  });
}
});

app.post('/api/addUser', function(req, res){
	console.log(req.body);
	if(!req.body.hasOwnProperty('id')){
	if(req.body.phone!=""){
con.query("INSERT INTO users (name,phone,email,address) VALUES ('"+req.body.name+"','"+req.body.phone+"','"+req.body.email+"','"+req.body.address+"')", function (err, result, fields) {
    if (err) throw err;
    res.send(result);

  });
}
}else{
	if(req.body.phone!=""){
		con.query("UPDATE users SET name='"+req.body.name+"',phone='"+req.body.phone+"',email='"+req.body.email+"',address='"+req.body.address+"' WHERE id="+req.body.id, function (err, result, fields) {
		    if (err) throw err;
		    res.send(result);

		  });
		}	
}
});


app.post('/api/saveUserDonation', function(req, res){
	console.log(req.body);
	
	if(req.body.user_id!=""){
con.query("INSERT INTO donations (user_id,price_id,price) VALUES ("+req.body.user_id+","+req.body.price_id+","+req.body.price+")", function (err, result, fields) {
    if (err) throw err;
    res.send(result);

  });
}

});



process.on('uncaughtException', function(ex) {
    console.log(ex);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})