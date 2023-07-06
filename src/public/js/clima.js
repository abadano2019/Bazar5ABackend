
let latitud=0;
let longitud=0;

let ubicacion = document.getElementById('ubicacion')
let valor_temp = document.getElementById('valor_temp')  
let desc_temp = document.getElementById('desc_temp')  
let icono = document.getElementById('icono') 
let viento = document.getElementById('viento')

window.addEventListener('load', ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            longitud = position.coords.longitude
            latitud = position.coords.latitude
                    
            const api_key = "a9bf9c9e99684b144c14f91ae8834f17";
            //            http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=a9bf9c9e99684b144c14f91ae8834f17
            //const url = "https://api.openweathermap.org/data/2.5/weather?lat=50&lon=50&&appid=a9bf9c9e99684b144c14f91ae8834f17"
            //const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&&appid=${api_key}`
           
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${api_key}&lang=es&units=metric`;

            fetch(url)
            .then(response => {return response.json()})
            .then (data =>{
                //console.log(data.main.temp, data.main.temp.unit = 'Celcius')
                let temp = Math.round(data.main.temp)
                valor_temp.textContent = `Temp: ${temp}°C ` 
                ubicacion.textContent = data.name; 
                desc_temp.textContent = data.weather[0].description
                viento.textContent = `Viento: ${data.wind.speed}m/s`;
                console.log(data)        
                
            switch (data.weather[0].main) {
                case 'Thunderstorm':
                    icono.src='/animated/thunder.svg'
                    console.log('TORMENTA');
                    break;
                case 'Drizzle':
                    icono.src='/animated/rainy-2.svg'
                    console.log('LLOVIZNA');
                    break;
                case 'Rain':
                    icono.src='/animated/rainy-7.svg'
                    console.log('LLUVIA');
                    break;
                case 'Snow':
                    icono.src='/animated/snowy-6.svg'
                    console.log('NIEVE');
                    break;                        
                case 'Clear':
                    icono.src='/animated/day.svg'
                    console.log('LIMPIO');
                    break;
                case 'Atmosphere':
                    icono.src='/animated/weather.svg'
                    console.log('ATMOSFERA');
                    break;  
                case 'Clouds':
                    icono.src='./animated/cloudy-day-1.svg'
                    console.log('NUBES');
                    break;  
                default:
                    icono.src='/animated/cloudy-day-1.svg'
                    console.log('por defecto');
                }


            })
            .catch(error =>{
                console.log("Error en servicio de clima: " + error) 
                icono.src='/animated/cloudy-day-1.svg'    
                ubicacion.textContent = "Error en servicio"
                desc_temp.textContent = "Momentaneamente fuera de servicio" 
                   
            })

        })      
    }

})