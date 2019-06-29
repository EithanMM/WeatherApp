const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

// DEFINE PATHS FOR EXPRESS CONFIG
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// SETUP HANDLEBARS ENGINE AND VIEWS LOCATION
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// SETUP STATIC DIRECTORY TO SERVE
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Eithan Mendez Mendez'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Eithan Mendez Mendez'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		message: 'Here will be something that you might need BOI.',
		title: 'Help',
		name: 'Eithan Mendez Mendez'
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({ errorMessage: 'Address must be provided!' });
	}

	geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ errorMessage: error });
		}
		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ errorMessage: error });
			}

			res.send({
				location,
				forecast: forecastData,
				address: req.query.address
			});
		});
	});

	// res.send({
	// 	forecast: 'Sunny all day',
	// 	address: req.query.address
	// });
});

//CREATE AN ENDPOINT URL
app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term.'
		});
	}
	//Info of a queryString lives in the 'req' parameter.
	console.log(req.query);
	res.send({ products: [] });
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Eithan Mendez Mendez',
		errorMessage: 'Help article not found!'
	});
});

// 404 custom error page
app.get('*', (req, res) => {
	//will match anything that wasnt previously matched in express.
	res.render('404', {
		title: '404',
		name: 'Eithan Mendez Mendez',
		errorMessage: 'Error 404, Page not found!'
	});
});

//start the server
app.listen(3000, () => {
	console.log('Server is up on port 3000!');
});
