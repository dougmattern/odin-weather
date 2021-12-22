// weather app

let loc = 'Dallas'

// API call
async function getWeather(location){
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=09ce9eb342aca170012cfec623cc98e5`,
     {mode: 'cors'})
    const data = await response.json();
    processData(data);
    
}

// pull out data wanted for display
function processData(data){
   // const data = await getWeather(location)
    const { main: { temp, humidity },
        name, 
        weather: [{ description, main }],
        wind: { speed }} = data;
        console.log(name, temp, humidity, main, description, speed)
}

// display data
function displayData(){

}

//delete data
function deleteData(){

}

// search/get a location to call data for
function inputLocation(){

}

getWeather(loc);
