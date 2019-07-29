import React, { useState } from "react";
import Namicorn from "namicorn";

const NO_ADDRESS_FOUND = "No Address Found";

const App = () => {
    const namicorn = new Namicorn();
    const [selectedCoin, setSelectedCoin] = useState("ZIL");
    const [userInput, setUserInput] = useState("");
    const [address, setAddress] = useState();

    const _renderRadioButton = ({ value }) => (
        <label className="Title" style={{ margin: "5px" }}>
            <input
                type="radio"
                name="selectedCoin"
                id={value}
                onChange={e => setSelectedCoin(e.target.id)}
                checked={selectedCoin === value}
            />
            {value}
        </label>
    );

    const renderRadioButtons = () => (
        <>
            {_renderRadioButton({ value: "ZIL" })}
            {_renderRadioButton({ value: "ETH" })}
            {_renderRadioButton({ value: "BTC" })}
        </>
    );

    const handleUserInput = e => {
        const tempUserInput = e.target.value;
        setUserInput(tempUserInput);
        const potentialDomain = e.target.value.split(".");
        if (
            potentialDomain.length > 1 &&
            potentialDomain[potentialDomain.length - 1].length === 3
        ) {
            namicorn
                .resolve(tempUserInput)
                .then(({ addresses }) => setAddress(addresses))
                .catch(e => console.error(e));
        }
    };

    const renderSearchBar = () => (
        <div className="Wrapper">
            <div className="Input">
                <input
                    type="text"
                    id="input"
                    className="Input-text"
                    placeholder="Please enter domain you wish to inspect"
                    value={userInput}
                    onChange={handleUserInput}
                />
                <label htmlFor="input" className="Input-label">
                    Domain name
                </label>
            </div>
        </div>
    );

    const renderResults = () => (
        <>
            <span className="Title">
                {!address ? "" : address[selectedCoin] || NO_ADDRESS_FOUND}
            </span>
        </>
    );

    return (
        <div className="App">
            <div className="header">
                <h1 className="Title">Domain Name Resolution example</h1>
            </div>
            <div className="radioButtons">{renderRadioButtons()}</div>
            <div className="searchBar">{renderSearchBar()}</div>
            <div className="results">{renderResults()}</div>
        </div>
    );
};

export default App;
