import React from "react";
import "./styles/App.scss";
import FilmBasicTab from "./components/FilmBasicTabComponent/FilmBasicTabComponent";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <FilmBasicTab />
    </div>
  );
};

export default App;
