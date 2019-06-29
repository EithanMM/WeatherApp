console.log('Client side Javascript is loaded');

//Obtains the form elemenet
const weatherForm = document.querySelector('form');
//Obtains the input element
const search = document.querySelector('input');
//Obtains the paragraph with ids
const messageOne = document.querySelector('#result-1');
const messageTwo = document.querySelector('#result-2');

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
				messageOne.textContent = data.location;
				messageTwo.textContent = data.forecast;
			}
		});
	});
});
