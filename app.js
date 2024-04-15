 const apiKey = "609208b6d272befd85b3fbcd4aaeb21f";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const submit_btn=document.getElementById('submit-btn');
  
const url = (city)=> `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;


async function getWeatherByLocation(city){
     
         const resp = await fetch(url(city), {
             origin: "cors" });
         const respData = await resp.json();

         let city_code=respData.cod;
         if(city_code==='400'){ 
             alert("Empty Input, Please enter any city");
             window.location.reload();
             reset();
         }else if(city_code==='404'){
             alert("Entered city didn't matched");
             window.location.reload();   
         }
         else{
           addWeatherToPage(respData,city);
         }
     }

      function addWeatherToPage(data,city){


        
          const temp = Ktoc(data.main.temp);
          const humd=data.main.humidity;
          const pressure=data.main.pressure;
          const wind=data.wind.speed;
          const weathermain=data.weather[0].main;
          const descp=data.weather[0].description;
         
      

          const weather = document.createElement('div')
          weather.classList.add('weather');
           

          weather.innerHTML = `
          <h3 style="text-transform:uppercase; margin-top:2rem;" >${city}</h3>
          <h2><img class="weather-img" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
          <h4>Wind: ${wind} km/hr </h4> 
         <h4>Humidity: ${humd} %</h4> 
         <h4>Pressure: ${pressure} hPa</h4>     
          <h4>${descp}</h4>
          
          `;


        //   cleanup 
          main.innerHTML= "";
           main.appendChild(weather);
        changebackground(data.weather[0].main);
        clearinput();
         
   
         
      };


     function Ktoc(K){
         return Math.floor(K - 273.15);
     }
   
     function changebackground(img)
     {
        const maincontainer=document.querySelector('div.main-container');
        if(img=="Clouds")
        {
            maincontainer.style["background-image"]= "url(clouds.jpg)";
        }
        else if(img=="Haze"){
            maincontainer.style["background-image"]= "url(haze.jpg)";
        }
        else if(img=="Thunderstorm"){
            maincontainer.style["background-image"]= "url(thunderstorm.jpg)";s
        }
        else if(img=="Rain"){
            maincontainer.style["background-image"]= "url(rain.jpg)";
        }
        else{
            maincontainer.style["background-image"]= "url(bg1.jpg)";
        }   
     }

     function clearinput()
     {
        const getValue=document.getElementById(("search"))
        getValue.value="";
     }
     


     submit_btn.addEventListener('click', function(){ 
        const city = search.value;
           getWeatherByLocation(city);
     })



     form.addEventListener('submit',(e) =>{
        e.preventDefault();

        const city = search.value;
        getWeatherByLocation(city);


     });


