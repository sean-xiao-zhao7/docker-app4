import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// styles
import logo from "./logo.svg";
import "./App.css";

function HomePage() {
    const [seenIndexes, setSeenIndexes] = useState([]);
    const [values, setValues] = useState([]);
    const [index, setIndex] = useState("");
    const [fetchNewValues, setFetchNewValues] = useState(false);

    useEffect(() => {
        fetchValues();
        fetchSeenIndexes();
        setFetchNewValues(false);
    }, [fetchNewValues]);

    const fetchValues = async () => {
        try {
            const valuesResult = await axios.get("/api/values/current");
            let valuesResultArray = [];
            for (const key in valuesResult.data) {
                if (key && key !== "undefined") {
                    valuesResultArray.push([key, valuesResult.data[key]]);
                }
            }
            setValues(valuesResultArray);
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
            setFetchNewValues(true);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Fibonacci App New</h1>
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
                        onChange={(e) => {
                            setIndex(e.target.value);
                        }}
                    />
                    <button type="submit">Go</button>
                </form>
                <div>
                    <h2>Indexes I have seen</h2>
                    <div>
                        {seenIndexes.map(({ number }) => {
                            return <p key={number}>{number}</p>;
                        })}
                    </div>
                </div>
                <div>
                    <h2>Calculated values</h2>
                    <div>
                        {values.map((value, index) => {
                            return (
                                <p key={index}>
                                    Key: {value[0]}, Val: {value[1]}
                                </p>
                            );
                        })}
                    </div>
                </div>
            </header>
        </div>
    );
}

export default HomePage;
