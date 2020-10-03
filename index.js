
const port = 8000;
//Setting up home
const home = '/home/majd';
//Setting up database path
const DB_PATH = '/home/majd/sqlite/Models_R_US.db';
//for accepting external http requests: 
//app.use((req, res, next) => { res.header("Access-Control-Allow-Origin", "*"); next(); });

//Setting up the server
const net = require('net');
const https = require('https');
const express = require('express');
const session = require('express-session');
const fs = require('fs');

//Setting up the database
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(DB_PATH);

//Setting up the server
var app = express();
app.enable('trust proxy');

//Setting up the session
app.use(session(
	{
		secret: "mine",
		proxy: true,
		resave: true,
		saveUninitialized: true
	}));

/*
This service receives the parameter “id”, an integer.
Returns the id’s and names of all products in the Product table of the  Models_R_US.db whose category ID “catID” is equal to the passed parameter. 
The return format is “application/json” and should be an array of JSON objects with keys: “id” and “name”.
*/
app.use("/list", (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	let id = req.query.id;
	let query = "select id, name from product where catid = ?";
	db.all(query, [id], (err, rows) => {
		if (err == null) {
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.write(JSON.stringify(rows));
			res.end();
		}
		else {
			res.end("Error " + err);
		}
	});
});

/*
This service receives the parameter “id”, an integer. 
Returns only the product name only.
The return format is "text/plain"
*/
app.use("/productname", (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	let id = req.query.id;
	let query = "select name from product where id = ?";
	db.all(query, [id], (err, name) => {
		if (err == null) {
			res.writeHead(200, { 'Content-Type': 'text/plain' });
			res.write(name);
			res.end();
		}
		else {
			res.end("Error " + err);
		}
	});
});

/*
This service receives the parameter “id”, an integer. 
Returns the entire product info.
The return format is application/json
*/
app.use("/productinfo", (req, res) => {
	let id = req.query.id;
	let query = "select * from product where id = ?";
	db.all(query, [id], (err, rows) => {
		if (err == null) {
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.write(JSON.stringify(rows));
			res.end();
		}
		else {
			res.end("Error " + err);
		}
	});
});

/*
This service receives the parameter “id”, an integer. 
Returns the entire product info.
The return format is application/json
*/
app.use('/product', function (req, res) {
	let id = req.query.id;
	res.header('Access-Control-Allow-Origin', '*');
	res.writeHead(200, { 'Content-Type': 'application/json' });
	let query;
	if (id) {
		query = "select * from product where id = ?";
		db.all(query, [id], (err, rows) => {
			if (err == null) {
				res.write(JSON.stringify(rows));
				res.end();
			}
			else {
				res.end("Error " + err);
			}
		});
	}
});

/*
This service receives URL with  one parameter “id” containing an integer.
Returns the id and name of the row corresponding to that id in the Category table of the Models_R_US.db. 
Response’s content type is “Application/JSON”.
If the id parameter is missing then the return should be an array of json objects for all rows in the table.
*/
app.use('/Catalog', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	//reading the parameter if exist!
	let id = req.query.id;
	// prepared statement:
	let query = "select id, name from Category where id = ?";
	//If the id parameter is missing then the return should be an array of json objects for all rows in the table.
	if (id === undefined) {
		query = "select id, name from Category";
	}
	//[id] is to replace the "?" used in the query
	db.all(query, [id], (err, rows) => {
		if (err == null) {
			//The return should be mimed as "application/json" in the response's content type.
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.write(JSON.stringify(rows));
			res.end();
		}
		else {
			res.end("Error " + err);
		}
	});
});

/*
This service receives the parameter “item”, a JSON object containing the “id”, “price” and “qty” of a product.
Returns the updated cart as an array of JSON object. 
If the qty of any item is not positive, the item is to be deleted from the cart. 
If the parameter is missing, the current cart is returned.
*/
app.use("/cart", (req, res) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
	res.header('Access-Control-Allow-Credentials', 'true');
	//checking if parameter exist as in /cart?item=JSON_Object
	//will fail when nothing is passed as in /cart 
	if(req.query.item)
	{
	//parsing the object passed
	let JSONitem = JSON.parse(req.query.item);
	//checking the object have the required data
	if (JSONitem && JSONitem.id && JSONitem.price) {
		//a list of varaibles
		var targetID = JSONitem.id;
		var newQTY = JSONitem.qty;
		var incrementedQTY = 0;
		let incrementedJSON = JSONitem;
		var isItemFound = false;
		//if session doesn't exist then create one then if qty is positive add the object
		if (!req.session.cart)  //JAVA equlivant: req.getSession().getAttribute("cart")
		{
			req.session.cart = [];
			console.log("new session created");
			if (JSONitem.qty > 0) {
				req.session.cart.push(JSONitem);
			}
		}
		//if session exist but empty and request has positive qty: add it
		else if (req.session.cart && req.session.cart.length == 0 && JSONitem.qty > 0)
		{
			req.session.cart.push(JSONitem);
		}
		//session exist: if object already exist then delete it first then if new_qty + old_qty is positive add it.
		else {
			req.session.cart.forEach((object, index) => {
				//is this the object we want
				if (JSON.parse(JSON.stringify(object)).id == targetID) {
					isItemFound = true;
					//user wants to delete existing record
					if (newQTY == 0 || (Number(newQTY) + Number(JSON.parse(JSON.stringify(object)).qty) == 0))
					{
						req.session.cart.splice(index, 1);
					}
					//updating entry in the session
					else
					{
						incrementedQTY = Number(newQTY) + Number(JSON.parse(JSON.stringify(object)).qty);
						incrementedJSON.qty = incrementedQTY;
						req.session.cart.splice(index, 1);
						req.session.cart.splice(index, 0, incrementedJSON);
					}
				}
			});
			//if no recored is found and new_qty is positive then add it
			if(!isItemFound && newQTY > 0)
			{
				req.session.cart.push(JSONitem);
			}
		}
	}
}
	//to return json instead of text
	res.writeHead(200, { 'Content-Type': 'application/json' });
	//in all cases this will send the cart
	res.end(JSON.stringify(req.session.cart));
	console.log("session is: " + JSON.stringify(req.session.cart));
});

/*
This service receives URL with two parameters “from” and “to” containing the start and the end of the trip. 
It returns the optimal distance and time (in km and minutes) between them given the current traffic condition. 
The parameters expected to be passed to Google Maps API is: “from” address, “to” address, API key, Departure time.
*/
app.use('/Trip', function (req, res) {
	let from = req.query.from;
	let to = req.query.to;
	let url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + from + "&destinations=" + to + "&departure_time=now&key=AIzaSyAiV5RgxDPz_BhOX_4srpRdFfYXRmEELoU";
	https.get(url, (resp) => {
		let data = '';
		resp.on('data', (x) => {
			data += x;
		});
		resp.on('end', () => {
			res.write("Optimal Distance: " + JSON.parse(data).rows[0].elements[0].distance.text);
			res.end("\nOptimal Time: " + JSON.parse(data).rows[0].elements[0].duration.text);
		});
	}).on("error", (err) => {
		res.send(err);
	});

});


//SERVER
var server = app.listen(port, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Listening at http://%s:%d', host, port);
});
