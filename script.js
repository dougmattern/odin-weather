// weather app

const search = document.getElementById('search');
const locationInput = document.getElementById('location');
search.addEventListener('click', (e) => {
    e.preventDefault();
    inputLocation();
})

// click temp to toggle celsius/fahrenheit
const temperature = document.querySelector('.temp');
temperature.addEventListener('click', toggleTemp);
function toggleTemp(){
    temperature.classList.add('celsius')
}

// API call
async function getWeather(location){
    try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=09ce9eb342aca170012cfec623cc98e5`,
     {mode: 'cors'});
    const data = await response.json();
    processData(data);
    } catch (e) {
        document.querySelector('.name').innerText = 'Not Found'
        document.querySelector('.temp').innerText = 'x'
        document.querySelector('.humidity').innerText = 'x'
        document.querySelector('.main').innerText = 'x'
        document.querySelector('.description').innerText = 'x'
        document.querySelector('.speed').innerText = 'x'
    }
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
    const card = document.getElementById('card');
    const cityName = document.querySelector('.name');
    // box shadow and underline effect based on weather
    if(main == 'Clouds') {
        card.style.boxShadow = '20px 20px 20px 20px #464646'
        cityName.style.textDecoration = 'underline solid #464646'
   } else if(main == 'Clear') {
        card.style.boxShadow = '20px 20px 20px 20px #CACA00'
        cityName.style.textDecoration = 'underline solid #CACA00'
   } else if(main == 'Snow') {
        card.style.boxShadow = '20px 20px 20px 20px #85BDCD'
        cityName.style.textDecoration = 'underline solid #85BDCD'
   } else if(main == 'Rain' || 'Drizzle' || 'Thunderstorm' || 'Mist') {
        card.style.boxShadow = '20px 20px 20px 20px #000073'
        cityName.style.textDecoration = 'underline solid #000073'
   }
// input selected data
    document.querySelector('.name').innerText = name
    document.querySelector('.temp').innerText = temp + ' °F'
    document.querySelector('.humidity').innerText = 'Humidity: ' + humidity +'%'
    document.querySelector('.main').innerText = main
    document.querySelector('.description').innerText = description
    document.querySelector('.speed').innerText = 'Wind: '+speed+' mph'

   // const celsius = (temp-32)/1.8 do opacity? change innertext?

}

// search/get a location to call data for
function inputLocation(){
    const location = locationInput.value;
    getWeather(location);
    locationInput.value='';
}

