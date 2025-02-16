import { useEffect, useState } from "react";
import InputUbicacion from "./Components/InputUbicacion/InputUbicacion";
import Weather from "./Components/Weather/Weather";
import styles from "./Home.module.css";

const Home = () => {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [value]);
  return (
    <div className={styles.container}>
      <div className={styles.weatherContainer}>
        <Weather value={debouncedValue} />
      </div>
      <div className={styles.inputContainer}>
        <InputUbicacion
          label="Ubicación"
          name="ubicacion"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Home;
