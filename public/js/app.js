console.log('Client side Javascript is loaded');

//Obtains the form elemenet
const weatherForm = document.querySelector('form');
//Obtains the input element
const search = document.querySelector('input');
//Obtains the paragraph with ids
const messageOne = document.querySelector('#result-1');
const messageTwo = document.querySelector('#result-2');
const ctx = document.getElementById('myChart').getContext('2d');

//Add an event listener to the form.
weatherForm.addEventListener('submit', (e) => {
	//prevents the lose of data when refreshing.
	e.preventDefault();
	messageOne.textContent = 'Loading data...';
	messageTwo.textContent = '';
	const location = search.value;

	fetch('/weather?address=' + location).then((response) => {
		response.json().then((data) => {
			if (data.errorMessage) {
				messageOne.textContent = data.errorMessage;
			} else {
				console.log(data);
				createChart(data);
			}
		});
	});
});

const createChart = (data) => {
	messageOne.textContent = data.location;
	messageTwo.textContent = data.forecast.summary;
	var temperatures = data.forecast.hourlyForecast;
	const tempData = [];
	const hours = [];

	for (element in temperatures) {
		tempData.push(temperatures[element].temperature);
		let date = new Date(temperatures[element].time * 1000);
		hours.push(date.toLocaleDateString() + ' - ' + date.toLocaleTimeString());
	}

	var ctx = document.getElementById('myChart').getContext('2d');
	var ctx2 = document.getElementById('myChart2').getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'line',
		data: {
			//labels van las horas.
			labels: hours,
			datasets: [
				{
					label: 'Temperature',
					data: tempData,
					backgroundColor: [ 'rgba(255, 206, 86, 0.2)' ],
					borderColor: [ 'rgba(255, 206, 86, 1)' ],
					borderWidth: 3
				}
			]
		},
		options: {
			title: {
				display: true,
				position: 'top',
				text: 'Temperature within the next 12 hours'
			},
			scales: {
				yAxes: [
					{
						ticks: {
							beginAtZero: true
						}
					}
				]
			}
		}
	});

	var myChart2 = new Chart(ctx2, {
		type: 'bar',
		data: {
			datasets: [
				{
					label: 'Max temperature',
					data: [ data.forecast.maxTemperature ],
					backgroundColor: [ 'rgba(255, 99, 132, 0.2)' ],
					borderColor: [ 'rgba(255, 99, 132, 1)' ],
					borderWidth: 3
				},
				{
					label: 'Current temperature',
					data: [ data.forecast.temperature ],
					backgroundColor: [ 'rgba(54, 162, 235, 0.2)' ],
					borderColor: [ 'rgba(54, 162, 235, 1)' ],
					borderWidth: 3
				},
				{
					label: 'Min temperature',
					data: [ data.forecast.minTemperature ],
					backgroundColor: [ 'rgba(75, 192, 192, 0.2)' ],
					borderColor: [ 'rgba(75, 192, 192, 1)' ],
					borderWidth: 3
				}
			]
		},
		options: {
			title: {
				display: true,
				position: 'top',
				text: 'Temperature in °C'
			},
			scales: {
				yAxes: [
					{
						ticks: {
							beginAtZero: true,
							callback: (value, index, values) => {
								return '% ' + value;
							}
						}
					}
				]
			}
		}
	});
};
