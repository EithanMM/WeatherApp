const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url =
		'https://api.darksky.net/forecast/6020495b890cfd5e7c9b981e949b1ba9/' + latitude + ',' + longitude + '?units=si';

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service.', undefined);
		} else if (body.error) {
			callback('Unable to find location.', undefined);
		} else {
			callback(
				undefined,
				body.daily.data[0].summary +
					' It is currently ' +
					body.currently.temperature +
					' Celsius degree out. With a minimal temperature of ' +
					body.daily.data[0].temperatureHigh +
					' Celsius degree and a maximal temperature of ' +
					body.daily.data[0].temperatureLow +
					' Celsius degree out. There is a ' +
					body.currently.precipProbability +
					'% chance of rain.'
			);
		}
	});
};

module.exports = forecast;
