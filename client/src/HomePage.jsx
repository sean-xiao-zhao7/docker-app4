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
    }, []);

    const fetchValues = async () => {
        try {
            const values = await axios.get("/api/values/current");
            console.log(values.data);
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

    const submitIndexHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/values/new", {
                index: index,
            });
            setIndex("");
        } catch (err) {
            console.log(err);
        }
    };

    let valuesElement;
    if (values !== {}) {
        for (let key in values) {
            valuesElement += (
                <p>
                    Index {key} - {values[key]}
                </p>
            );
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Fibonacci App</h1>
                <div>
                    <Link to="/results">Results</Link>
                </div>
                <form onSubmit={submitIndexHandler}>
                    <label htmlFor="index">Enter index:</label>
                    <input
                        type="text"
                        name="index"
                        id="index"
                        placeholder="Index"
                        onChange={setIndex}
                    />
                    <button type="submit">Go</button>
                </form>
                <div>
                    <h2>Indexes I have seen</h2>
                    <div>
                        {seenIndexes.map(({ number }) => {
                            return <span>{number}</span>;
                        })}
                    </div>
                </div>
                <div>
                    <h2>Calculated values</h2>
                    <div>{valuesElement}</div>
                </div>
            </header>
        </div>
    );
}

export default HomePage;
