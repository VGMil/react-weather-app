import { Fragment, JSX } from "react";
import styles from "./App.module.css";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Pages/Home/Home";

const navBarOptions = [
  { id: 1, name: "Temperatura", ref: "/" }
];

const App = (): JSX.Element => {
  return (
    <Fragment>
      <div className={styles.app}>
        <header className={styles.header}>
          <NavBar items={navBarOptions} />
        </header>

        <main className={styles.main}>
          <Home />
        </main>

      </div>
    </Fragment>
  );
};
export default App;
