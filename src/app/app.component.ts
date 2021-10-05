import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'weather-web';
  latitude: any;
  longitude: any;
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  now = new Date();
  dayActive: any;
  dayActiveIndex = 0;
  data: any = {};

  constructor(public http: HttpClient) { }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition.bind(this));
    } else {
      this.basicLocation();
      this.getWeather();
    }
  }

  basicLocation() {
    this.latitude = 50.450001;
    this.longitude = 30.523333;
  }

  showPosition(pos: any) {
    if (pos.coords && pos.coords.longitude && pos.coords.latitude) {
      this.latitude = pos.coords.latitude;
      this.longitude = pos.coords.longitude;
    } else {
      this.basicLocation();
    };
    this.getWeather();
  }

  getWeather() {
    this.getWeatherApi().subscribe(res => {
      if (res) {
        console.warn('weather', res)
        this.setResult(res);
      }
    })
  }

  getWeatherApi() {
    return this.http.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.latitude}&lon=${this.longitude}&exclude=minutely,hourly&APPID=1120d9e68a9842cedcdeecdf460ff13b&units=metric`);
  }

  setResult(res: any) {
    this.data = {
      current: {
        date: `${this.now.getHours()}:${('0' + this.now.getMinutes()).slice(-2)}`,
        feelsLike: Math.round(res.current.feels_like),
        temp: Math.round(res.current.temp),
        weather: res.current.weather[0].description,
        icon: `../assets/icons/${res.current.weather[0].icon}.svg`,
        name: this.getWeekDay(this.now),
        timezone: res.timezone
      },
      week: [{
        name: this.getWeekDay(this.now),
        max: Math.round(res.daily[0].temp.max),
        min: Math.round(res.daily[0].temp.min),
        icon: `../assets/icons/${res.daily[0].weather[0].icon}.svg`,
        uvi: res.daily[0].uvi,
        windDeg: this.setWindDirection(res.daily[0].wind_deg),
        windSpeed: res.daily[0].wind_speed,
        humidity: res.daily[0].humidity,
        clouds: res.daily[0].clouds,
        pop: res.daily[0].pop,
      }, {
        name: this.getWeekDay(new Date(+this.now + 86400000)),
        max: Math.round(res.daily[1].temp.max),
        min: Math.round(res.daily[1].temp.min),
        icon: `../assets/icons/${res.daily[1].weather[0].icon}.svg`,
        uvi: res.daily[1].uvi,
        windDeg: this.setWindDirection(res.daily[1].wind_deg),
        windSpeed: res.daily[1].wind_speed,
        humidity: res.daily[1].humidity,
        clouds: res.daily[1].clouds,
        pop: res.daily[1].pop,
      }, {
        name: this.getWeekDay(new Date(+this.now + 86400000 * 2)),
        max: Math.round(res.daily[2].temp.max),
        min: Math.round(res.daily[2].temp.min),
        icon: `../assets/icons/${res.daily[2].weather[0].icon}.svg`,
        uvi: res.daily[2].uvi,
        windDeg: this.setWindDirection(res.daily[2].wind_deg),
        windSpeed: res.daily[2].wind_speed,
        humidity: res.daily[2].humidity,
        clouds: res.daily[2].clouds,
        pop: res.daily[2].pop,
      }, {
        name: this.getWeekDay(new Date(+this.now + 86400000 * 3)),
        max: Math.round(res.daily[3].temp.max),
        min: Math.round(res.daily[3].temp.min),
        icon: `../assets/icons/${res.daily[3].weather[0].icon}.svg`,
        uvi: res.daily[3].uvi,
        windDeg: this.setWindDirection(res.daily[3].wind_deg),
        windSpeed: res.daily[3].wind_speed,
        humidity: res.daily[3].humidity,
        clouds: res.daily[3].clouds,
        pop: res.daily[3].pop,
      }, {
        name: this.getWeekDay(new Date(+this.now + 86400000 * 4)),
        max: Math.round(res.daily[4].temp.max),
        min: Math.round(res.daily[4].temp.min),
        icon: `../assets/icons/${res.daily[4].weather[0].icon}.svg`,
        uvi: res.daily[4].uvi,
        windDeg: this.setWindDirection(res.daily[4].wind_deg),
        windSpeed: res.daily[4].wind_speed,
        humidity: res.daily[4].humidity,
        clouds: res.daily[4].clouds,
        pop: res.daily[4].pop,
      }, {
        name: this.getWeekDay(new Date(+this.now + 86400000 * 5)),
        max: Math.round(res.daily[5].temp.max),
        min: Math.round(res.daily[5].temp.min),
        icon: `../assets/icons/${res.daily[5].weather[0].icon}.svg`,
        uvi: res.daily[5].uvi,
        windDeg: this.setWindDirection(res.daily[5].wind_deg),
        windSpeed: res.daily[5].wind_speed,
        humidity: res.daily[5].humidity,
        clouds: res.daily[5].clouds,
        pop: res.daily[5].pop,
      }, {
        name: this.getWeekDay(new Date(+this.now + 86400000 * 6)),
        max: Math.round(res.daily[6].temp.max),
        min: Math.round(res.daily[6].temp.min),
        icon: `../assets/icons/${res.daily[6].weather[0].icon}.svg`,
        uvi: res.daily[6].uvi,
        windDeg: this.setWindDirection(res.daily[6].wind_deg),
        windSpeed: res.daily[6].wind_speed,
        humidity: res.daily[6].humidity,
        clouds: res.daily[6].clouds,
        pop: res.daily[6].pop,
      }]
    }
    console.warn('data', this.data)
    this.dayActive = this.data.week[0]
  }


  getWeekDay(date: any) {
    return this.days[date.getDay()];
  }

  setWindDirection(value: number) {
    if (value > 348.75 || value <= 11.25) {
      return 'N';
    } else if (value > 11.25 && value <= 33.75) {
      return 'NNE';
    } else if (value > 33.75 && value <= 56.25) {
      return 'NE';
    } else if (value > 56.25 && value <= 78.75) {
      return 'ENE';
    } else if (value > 78.75 && value <= 101.25) {
      return 'E';
    } else if (value > 101.25 && value <= 123.75) {
      return 'ESE';
    } else if (value > 123.75 && value <= 146.25) {
      return 'SE';
    } else if (value > 146.25 && value <= 168.75) {
      return 'SSE';
    } else if (value > 168.75 && value <= 191.25) {
      return 'S';
    } else if (value > 191.25 && value <= 213.75) {
      return 'SSW';
    } else if (value > 213.75 && value <= 236.25) {
      return 'SW';
    } else if (value > 236.25 && value <= 258.75) {
      return 'WSW';
    } else if (value > 258.75 && value <= 281.25) {
      return 'W';
    } else if (value > 281.25 && value <= 303.75) {
      return 'WNW';
    } else if (value > 303.75 && value <= 326.25) {
      return 'NW';
    } else if (value > 326.25 && value <= 348.75) {
      return 'NNW';
    } else {
      return `${value}°`;
    }
  }

  changeActiveDay(i: number) {
    this.dayActive = this.data.week[i];
    this.dayActiveIndex = i;
  }
}
