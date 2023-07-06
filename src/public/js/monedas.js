let cotiz_dolar=0;
let cotiz_euro=0;
let cotiz_libra=0;
let cotiz_yen = 0;
let dolar = document.getElementById("cotizacion_dolar");
let euro = document.getElementById("cotizacion_euro");
let libra = document.getElementById("cotizacion_libra");
let yen = document.getElementById("cotizacion_yen");

fetch("https://v6.exchangerate-api.com/v6/4539bae58df795c2815465a0/latest/USD")
   .then(response => response.json())
   .then(result => {
        localStorage.setItem("cotizaciones",JSON.stringify(result));
                        
        cotiz_dolar = result.conversion_rates.UYU
        cotiz_yen = cotiz_dolar * result.conversion_rates.JPY
        cotiz_euro = cotiz_dolar * result.conversion_rates.EUR
        cotiz_libra = cotiz_dolar * result.conversion_rates.GBP

        dolar.textContent = `Dolar Americano: $ ${cotiz_dolar.toFixed(2)}`;
        euro.textContent = `Euro: $ ${cotiz_euro.toFixed(2)}`;
        libra.textContent = `Libra Esterlina: $ ${cotiz_libra.toFixed(2)}`;
        yen.textContent = `Yen: $ ${cotiz_yen.toFixed(2)}`;

    })
   .catch(error =>{
        console.log("Error 404 al conectar con servidor: " + error + "Se levanta contingencia")
        cotizaciones = JSON.parse(localStorage.getItem('cotizaciones'));
        
        cotiz_dolar = cotizaciones.conversion_rates.UYU
        cotiz_yen = cotiz_dolar * cotizaciones.conversion_rates.JPY
        cotiz_euro = cotiz_dolar * cotizaciones.conversion_rates.EUR
        cotiz_libra = cotiz_dolar * cotizaciones.conversion_rates.GBP

        dolar.textContent = `Dolar Americano: $ ${cotiz_dolar.toFixed(2)}`;
        euro.textContent = `Euro: $ ${cotiz_euro.toFixed(2)}`;
        libra.textContent = `Libra Esterlina: $ ${cotiz_libra.toFixed(2)}`;
        yen.textContent = `Yen: $ ${cotiz_yen.toFixed(2)}`;

   })
