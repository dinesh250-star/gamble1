import logo from "./logo.svg";
import "./App.css";
import Axios from "axios";
import Login from "./Components/Login/Login";
import Deposit from "./Components/Deposit/Deposit";

function App() {
  return (
    <div className="App">
      <Login />
      <Deposit />
    </div>
  );
}

export default App;
