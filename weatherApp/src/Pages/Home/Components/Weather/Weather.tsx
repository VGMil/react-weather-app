import { useEffect, useState } from "react";
import { weatherService } from "../../Services/weather.service";
import { weatherProps } from "./weather.model";
import { getTimeLabel, parseTime } from "../../../../utils/time.utils";


const detectTime = (time ="00:00:00"):string =>{
  const eng =  parseTime(time).timeOfDay;
  return getTimeLabel(eng);
}

function Weather({ value }: { value: string }) {
  const [result, setResult] = useState<weatherProps>({} as weatherProps);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (value) {
      setLoading(true);
      weatherService
        .searchByName(value)
        .then((res) => {
          setResult(res);
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [value]);


  if (loading) return <div>Cargando...</div>;
  return (
    <div>
      {result.address !== undefined  && (
        <div>
          <h2>{result.address}</h2>
          <p>Temperature: {result.temp}°C</p>
          <p>Tiempo: {detectTime(result.dateTime)}</p>
          <p>Clima: {result.conditions}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
