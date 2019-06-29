const request = require('request');

const geocode = (addres, callback) => {
	const url =
		'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
		encodeURIComponent(addres) +
		'.json?access_token=pk.eyJ1IjoiZWl0aGFubW0iLCJhIjoiY2p4NDF2M2Y2MDUxbzN5bXJrOTkzMW83aCJ9.ekm8GNxvSJ9eh7hZcWT7Ng&limit=1';
	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Cannot connect to MapBox service', undefined);
		} else if (body.features.length === 0) {
			callback('Unable to find location', undefined);
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name
			});
		}
	});
};

module.exports = geocode;
