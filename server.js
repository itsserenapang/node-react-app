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

app.post('/api/getMoviePosters', (req, res) => {
	console.log('get movies')
	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT M.name, MP.poster_link FROM s32pang.movie_poster MP join s32pang.movies M on MP.movieID = M.id`;
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


app.post('/api/searchMovies', (req, res) => {
	console.log('add review')
	console.log(req.body)
	let connection = mysql.createConnection(config);
	// let userID = req.body.userID;
	const title = req.body.title;
	
	let sql = ` Select M.id, M.name, D.first_name, D.last_name,  GROUP_CONCAT (DISTINCT REV.reviewContent), AVG(REV.reviewScore)
	from s32pang.movies M
	join s32pang.movies_directors MD on MD.movie_id = M.id
	join s32pang.directors D on D.id = MD.director_id
	join s32pang.roles R on R.movie_id = M.id
	join s32pang.actors A on A.id = R.actor_id
	left join s32pang.Review REV on REV.movieID = M.id
	where
`
	let prev = false;
	if (req.body.director.length !== 0){
		sql = sql + ` CONCAT(D.first_name, " ", D.last_name) like "%${req.body.director}%"` 
		prev = true
	}


	if (prev == true){
		sql = sql +" and " 
		prev = false
	}
	if (req.body.actor.length !== 0){
		sql = sql + ` CONCAT(A.first_name, " ", A.last_name) like "%${req.body.actor}%"` 
		prev = true
	}
	if (prev == true){
		sql = sql +" and " 
		prev = false
	}
	 if (req.body.movie.length !== 0){
		sql = sql + ` M.name like "%${req.body.movie}%"` 
 	}
	

	sql = sql + ` group by M.name, D.first_name, D.last_name, M.id;`

	console.log(sql);

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
