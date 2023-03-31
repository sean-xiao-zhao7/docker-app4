import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// styles
import logo from "./logo.svg";
import "./App.css";

function HomePage() {
    const [seenIndexes, setSeenIndexes] = useState([]);
    const [values, setValues] = useState({});
    const [index, setIndex] = useState("");

    useEffect(() => {
        fetchValues();
        fetchSeenIndexes();
    }, [index]);

    const fetchValues = async () => {
        try {
            const values = await axios.get("/api/values/current");
            setValues(values.data);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchSeenIndexes = async () => {
        try {
            const values = await axios.get("/api/values/all");
            setSeenIndexes(values.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Fibonacci App</h1>
                <div>
                    <Link to="/results">Results</Link>
                </div>
                <form>
                    <label for="index">Enter index:</label>
                    <input
                        type="text"
                        name="index"
                        id="index"
                        placeholder="Index"
                    />
                    <button>Go</button>
                </form>
                <div>
                    <h2>Indexes I have seen</h2>
                    <div></div>
                </div>
                <div>
                    <h2>Calculated values</h2>
                    <div></div>
                </div>
            </header>
        </div>
    );
}

export default HomePage;
