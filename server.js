let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));


app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/getMovies', (req, res) => {
	console.log('get movies')
	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT * from movies`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		// let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send(results);
	});
	connection.end();
});


app.post('/api/addReview', (req, res) => {
	console.log('add review')
	console.log(req.body)
	let connection = mysql.createConnection(config);
	// let userID = req.body.userID;
	const title = req.body.title;
	const body = req.body.body;
	const rating = req.body.rating;
	const userID = req.body.userID;
	const select = req.body.select;
	
	let sql = `INSERT INTO Review (reviewTitle, reviewContent, reviewScore, userID, movieID) VALUES ('${title}', '${body}', '${rating}', '${userID}', '${select}')`;
	console.log(sql);
	// let data = [userID];
	// console.log(data);
	//ASK CHLOE AND ESHA ------------------------
	//-------------------------------------------
	connection.query(sql, (error, results) => {
		if (error) {
			return console.error(error.message);
		}
		console.log(results)

		// let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send(results);
	});
	connection.end();
});



// app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
