import logo from "./logo.svg";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Fibonacci App</h1>
                <div>
                    <Link to="/results">Results</Link>
                </div>
            </header>
        </div>
    );
}

export default App;
