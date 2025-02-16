import { weatherProps } from "../Components/Weather/weather.model";

if (!import.meta.env.VITE_WEATHER_API_KEY) {
  throw new Error('Weather API key is not defined');
}

const BASE_URL = import.meta.env.VITE_WEATHER_API_BASE_URL;
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const weatherService = {
  searchByName: async (query: string): Promise<weatherProps> => {
    try {
      const response = await fetch(
        `${BASE_URL}/${query}?unitGroup=metric&include=current&key=${API_KEY}&contentType=json`
      );
      if (!response.ok) throw new Error("Error en la busqueda");
      const data = await response.json();
      const address = data.resolvedAddress
      const dateTime = data.currentConditions.datetime
      const conditions = data.currentConditions.conditions
      const temp = data.currentConditions.temp
console.log(data)
      return { address, dateTime, conditions, temp};
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
