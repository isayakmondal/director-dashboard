// eslint-disable-next-line react/no-typos
import "./App.css";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Header from "./components/Header";
import { useState } from "react";

function App() {
  const [login, setLogin] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        {/* <Header /> */}
        {/* <button onClick={() => setLogin(!login)}>
          {login ? "Logout" : "Login"}
        </button> */}
      
        <Switch>
          {/* <Route path="/" component={Header} exact /> */}
          <Route path="/" exact>
            <Dashboard login={login} setLogin={setLogin} />
          </Route>
          <Route path="/login" >
            <Login login={login} setLogin={setLogin} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
