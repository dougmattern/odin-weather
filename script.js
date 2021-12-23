// weather app

const search = document.getElementById('search');
const locationInput = document.getElementById('location');
search.addEventListener('click', (e) => {
    e.preventDefault();
    inputLocation();
})

// API call
async function getWeather(location){
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=09ce9eb342aca170012cfec623cc98e5`,
     {mode: 'cors'});
    const data = await response.json();
    processData(data);
    return data
}

// pull out data wanted for display
function processData(data){
    const { main: { temp, humidity },
        name, 
        weather: [{ description, main }],
        wind: { speed }} = data;
        displayData(name, temp, humidity, main, description, speed);
}

// display data
function displayData(name, temp, humidity, main, description, speed){
    document.querySelector('.name').innerText = name
    document.querySelector('.temp').innerText = temp + ' °F'
    document.querySelector('.humidity').innerText = 'Humidity: ' + humidity +'%'
    document.querySelector('.main').innerText = main
    document.querySelector('.description').innerText = description
    document.querySelector('.speed').innerText = 'Wind: '+speed+' mph'
}

// search/get a location to call data for
function inputLocation(){
    const location = locationInput.value;
    getWeather(location);
}

