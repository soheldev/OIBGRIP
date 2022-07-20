const api = {
    key: "557c6d65d6ea371afd112f45314db143",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', setQuery);
  
  function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
    }
  }
  
  function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults);
  }
  
  function displayResults (weather) {
    //console.log(weather);
    let city = document.querySelector('.Location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
  
    let now = new Date();
    let date = document.querySelector('.Location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
  
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
  }

  function dateBuilder(d){
      let  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

       return `${day} ${date} ${month} ${year}`;
  }
  var lastEdited = "celsius";  // initialize the lastEdited flag to any of the three input fields.

//button listeners
document.getElementById("submit").onclick = convert;
document.getElementById("reset").onclick = reset;

//picks up on if and when an input field changes, then sets the lastEdited flag to the input field that was changed.
document.getElementById("celsius").onchange = function() {
  lastEdited = "celsius";
};
document.getElementById("fahrenheit").onchange = function() {
  lastEdited = "fahrenheit";
};
document.getElementById("kelvin").onchange = function() {
  lastEdited = "kelvin";
};

function convert(temp) {

  //initialize local variables
  var celsius = document.getElementById("celsius").value;
  celsius = parseFloat(celsius);

  var fahrenheit = document.getElementById("fahrenheit").value;
  fahrenheit = parseFloat(fahrenheit);

  var kelvin = document.getElementById("kelvin").value;
  kelvin = parseFloat(kelvin);

  //temp values
  var conversionC;
  var conversionF;
  var conversionK;

  //if the celsius field changes, convert the fahrenheit and kelvin values
  if (lastEdited === "celsius") {
    conversionF = celsius * 9 / 5 + 32;
    conversionK = celsius + 273;
    //round the converted fahrenheit and kelvin values
    document.getElementById("fahrenheit").value = Math.round(conversionF);
    document.getElementById("kelvin").value = Math.round(conversionK);
  } 
    //if the fahrenheit field changes, convert the celsius and kelvin values
    else if (lastEdited === "fahrenheit") {
    conversionC = (fahrenheit - 32) * 5 / 9;
    conversionK = conversionC + 273;
    //round the converted celsius and kelvin values
    document.getElementById("celsius").value = Math.round(conversionC);
    document.getElementById("kelvin").value = Math.round(conversionK);
  } 
    //if the kelvin field changes, convert the celsius and fahrenheit values
    else if (lastEdited === "kelvin") {
    conversionC = kelvin - 273;
    conversionF = conversionC * 9 / 5 + 32;
    //round the converted celsius and fahrenheit values
    document.getElementById("celsius").value = Math.round(conversionC);
    document.getElementById("fahrenheit").value = Math.round(conversionF);
  }

  //get the current conversion temp values and store them in the input fields
  document.getElementById("celsius").innerHTML = conversionC;
  document.getElementById("fahrenheit").innerHTML = conversionF;
  document.getElementById("kelvin").innerHTML = conversionK;
}

//reset function for the reset button to reset all current values
function reset() {
  document.getElementById("celsius").value = 0;
  document.getElementById("fahrenheit").value = 0;
  document.getElementById("kelvin").value = 0;
}
