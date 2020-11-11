const fetch = require("cross-fetch");

module.exports = {
    postWeather(req, res, next) {
        const city = req.body.city;
        const API_KEY = "0bba110b1cd1172c8cf0ccaf62372fdd";

        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
            .then((res) => res.json())
            .then((data) => { 
                const mainInfo = data.weather[0];
                res.render("weather", { data, mainInfo } );
            })
            .catch(next); 
    }

}


