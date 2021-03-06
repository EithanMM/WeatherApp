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
			callback(undefined, {
				summary: body.daily.data[0].summary,
				temperature: body.currently.temperature,
				minTemperature: body.daily.data[0].temperatureLow,
				maxTemperature: body.daily.data[0].temperatureHigh,
				precipProbability: body.currently.precipProbability,
				hourlyForecast: body.hourly.data.slice(0, 13)
			});
		}
	});
};

module.exports = forecast;
