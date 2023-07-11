import './style.scss'
import axios from 'axios';
const api_key = e07c4738452531016c531f0fe37ad2eb;


class WeatherApp {
    async fetchingData(city) {
        const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&lang=az&timezone=${city}`)
            .then(res => res)
        return data;
    }

    sendData() {
        const searcResult = document.querySelector(".result")
        const second_result = document.querySelector(".second-result")
        const show_time = document.querySelector(".show-time")
        searcResult.innerHTML = ''
        second_result.innerHTML = ''
        show_time.innerHTML = ''
        const searc_city = document.querySelector("#search-city").value.trim()
        this.fetchingData(searc_city)
            .then(fetchingCountry => {
                //updating background image
                this.updatingBackImage(fetchingCountry?.data?.weather[0]?.description)
                //country ans cities time
                const tempInKelvin = fetchingCountry?.data?.main?.temp;
                const tempInCelsius = (tempInKelvin - 273.15).toFixed(0);
                searcResult.innerHTML = `${fetchingCountry?.data?.name} ${tempInCelsius}°`
                second_result.innerHTML = fetchingCountry?.data?.weather[0]?.description
                const timezoneOffset = fetchingCountry?.data.timezone;
                const date = new Date();
                const utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);
                const countryTime = new Date(utcTime + (timezoneOffset * 1000))
                show_time.innerHTML = ` Saat ${countryTime.toLocaleString().split(' ')[1]}`

            })
            .catch(error => {
                searcResult.innerHTML = 'Axtaris Xetasi';
            });
    }
    updatingBackImage(backImage) {
        const container = document.querySelector('.container')
        switch (true) {
            case backImage.includes("buludlu"):
                container.style.backgroundImage = "url('https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";
                break;
            case backImage.includes("aydın səma"):
                container.style.backgroundImage = "url(' https://images.pexels.com/photos/96622/pexels-photo-96622.jpeg?cs=srgb&dl=pexels-photomix-company-96622.jpg&fm=jpg')";
                break;
            case backImage.includes("qar"):
                container.style.backgroundImage = "url('https://images.pexels.com/photos/6530841/pexels-photo-6530841.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";
                break;
            case backImage.includes("yağış"):
                container.style.backgroundImage = "url('https://images.pexels.com/photos/125510/pexels-photo-125510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";
                break;
            default:
                container.style.backgroundImage = "url('https://i0.wp.com/notesfromanaspiringhumanitarian.com/wp-content/uploads/2017/04/Partly-Cloudy-Wallpaper.png?fit=1920%2C1080&ssl=1')";
        }

    }

}


const weather_app = new WeatherApp();
const searc_btn = document.querySelector("#search-btn");
searc_btn.addEventListener("click", () => {
    weather_app.sendData();
});

window.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        weather_app.sendData();
    }
});
