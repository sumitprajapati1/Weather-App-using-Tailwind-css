
const form =document.getElementById("weather");
const info=document.getElementById("weather-info");
const container = document.querySelector('.bg-blue-100');

const weatherInformation = async(event) =>
{
    event.preventDefault();
    const city=form.city.value.trim();
    if(city===' ')
    {
        alert("Please enter city name:");
        return;
    }
    const apiKey="ec80c8ff0f40456169674bcbc3583e04";
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try
    {
        const response= await fetch(url);
        const data= await response.json();
        if(response.ok)
        {
            displayWeather(data);
        }
        else
        {
            displayError(data.message);
        }
    }
    catch(error)
    {
        displayError(data.message);
    }
    
}

function displayError(message) {
    info.innerHTML = 
      `<div class="text-red-500">${message}</div>`;
      container.classList.remove('h-[900px]', 'md:h-[700px]');
      container.classList.add('h-[700px]', 'md:h-[520px]');
}


form.addEventListener("submit",weatherInformation);

function displayWeather(data) {
    info.innerHTML = `
        <div class="mt-3 ml-2 border rounded-md p-4  bg-yellow-200  hover:bg-yellow-300">
            <span class="text-gray-900"><i class="fas fa-thermometer-half text-red-500"></i>Temperature:</span>
            <span class="text-gray-800 font-medium"> ${data.main.temp}°C</span>
        </div>

        <div class="mt-3 mr-2 border rounded-md p-4  bg-blue-200 hover:bg-blue-300"><span class="text-gray-900">
            <i class="fas fa-cloud-sun  text-blue-500"></i>Weather:</span>
            <span class="text-gray-800 font-medium">    ${data.weather[0].description}</span>
        </div>

        <div class="ml-2 border rounded-md p-4  bg-green-200 hover:bg-green-300">
            <span class="text-gray-900"> <i class="fas fa-tint text-green-500"></i>  Humidity: </span>
            <span class="text-gray-800 font-medium">${data.main.humidity}%
              </span>
        </div>

        <div class="mr-2 border rounded-md p-4  bg-purple-200 hover:bg-purple-300">
            <span class="text-gray-900"> <i class="fas fa-wind text-yellow-500"></i>     Wind Speed: </span>
            <span class="text-gray-800 font-medium">${data.wind.speed} km/h
              </span>
        </div>

        <div class="ml-2 border rounded-md p-4 bg-red-200 hover:bg-red-300">
            <span class="text-gray-900"> <i class="fas fa-eye  text-indigo-500"></i>    Visibility:</span>
            <span class="text-gray-800 font-medium">${data.visibility / 1000} km
              </span>
        </div>

        <div class="mr-2 border rounded-md  p-4 bg-pink-200  hover:bg-pink-300 ">
            <span class="text-gray-900"><i class="fas fa-tachometer-alt text-yellow-400"></i> Pressure:</span>
            <span class="text-gray-800 font-medium">${data.main.pressure} hPa</span>
        </div>

        <div class="ml-2 border rounded-md p-4  bg-yellow-200  hover:bg-yellow-300 ">
            <span class="text-gray-900"> <i class="fas fa-sun text-yellow-500"> </i>  Sunrise: </span>
            <span class="text-gray-800 font-medium">${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</span>
        </div>

        <div class="mr-2 border rounded-md p-4  bg-gray-300 hover:bg-gray-400">
            <span class="text-gray-900"> <i class="fas fa-moon  text-yellow-400">  </i> Sunset: </span>
            <span class="text-gray-800  font-medium">${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</span>
        </div>
    `;
}