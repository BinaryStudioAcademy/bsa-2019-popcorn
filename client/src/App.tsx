import React from "react";
import "./styles/App.scss";
import FeedBlock from "./components/FeedBlock/FeedBlock"

const App: React.FC = () => {
  return (
    <div className="App">
      <FeedBlock/>
    </div>
  );
};

export default App;
