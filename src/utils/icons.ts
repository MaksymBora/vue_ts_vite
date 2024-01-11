export function weatherIcon(weather: string): string {
  switch (weather) {
    case "clear sky":
      return "https://openweathermap.org/img/wn/01d@2x.png";

    case "few clouds":
      return "https://openweathermap.org/img/wn/02d@2x.png";

    case "scattered clouds":
      return "https://openweathermap.org/img/wn/03d@2x.png";

    case "broken clouds":
      return "https://openweathermap.org/img/wn/04d@2x.png";

    case "shower rain":
      return "https://openweathermap.org/img/wn/09d@2x.png";

    case "rain":
      return "https://openweathermap.org/img/wn/10d@2x.png";

    case "thunderstorm":
      return "https://openweathermap.org/img/wn/11d@2x.png";

    case "snow":
      return "https://openweathermap.org/img/wn/13d@2x.png";

    case "mist":
      return "https://openweathermap.org/img/wn/50d@2x.png";

    default:
      return "https://openweathermap.org/img/wn/01d@2x.png";
  }
}
