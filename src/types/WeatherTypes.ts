export interface WeatherTypes {
  cod: string;
  message: number;
  cnt: number;
  list: List[];
  city: City;
}

export interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface Coord {
  lat: number;
  lon: number;
}

export interface List {
  dt: number;
  main: MainClass;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: string;
  snow?: Snow;
}

export interface Clouds {
  all: number;
}

export interface MainClass {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface Snow {
  "3h": number;
}

export interface Sys {
  pod: Pod;
}

export enum Pod {
  D = "d",
  N = "n",
}

export interface Weather {
  id: number;
  main: MainEnum;
  description: Description;
  icon: string;
}

export enum Description {
  BrokenClouds = "broken clouds",
  ClearSky = "clear sky",
  FewClouds = "few clouds",
  LightSnow = "light snow",
  OvercastClouds = "overcast clouds",
  ScatteredClouds = "scattered clouds",
}

export enum MainEnum {
  Clear = "clear",
  Clouds = "clouds",
  Snow = "snow",
  ClearSky = "clear sky",
  FewClouds = "few clouds",
  ScatteredClouds = "scattered clouds",
  BrokenClouds = "broken clouds",
  ShowerRain = "shower rain",
  Rain = "rain",
  Thunderstorm = "thunderstorm",
  Mist = "mist",
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}
