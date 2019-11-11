import React from 'react';
import './App.scss';
import Routes from "./routes/Routes";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="login">
        <div className="container">
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default App;
