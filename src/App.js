import React, { useState } from "react";
import Namicorn from "namicorn";

const NO_ADDRESS_FOUND = "No Address found for selected coin,";
const INVALID_DOMAIN = "Invalid Domain";

const App = () => {
    const namicorn = new Namicorn({ blockchain: true });
    const [selectedCoin, setSelectedCoin] = useState("ZIL");
    const [userInput, setUserInput] = useState("");
    const [loadingSpinner, setLoadingSpinner] = useState(false);
    const [domainInfo, setDomainInfo] = useState(null);

    const _renderSpinner = () => (
        <div className="lds-roller">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
        </div>
    );

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
        if (tempUserInput === "") setDomainInfo(null);
        setUserInput(tempUserInput);
    };

    const handleSubmit = e => {
        e.preventDefault();
        const potentialDomain = userInput.split(".");
        if (
            potentialDomain.length > 1 &&
            potentialDomain[potentialDomain.length - 1].length > 1
        ) {
            setLoadingSpinner(true);
            setDomainInfo(null);
            namicorn
                .resolve(userInput)
                .then(domainInfo => {
                    console.log({ domainInfo });
                    setDomainInfo(domainInfo);
                    setLoadingSpinner(false);
                })
                .catch(e => console.error(e));
        } else setDomainInfo(null);
    };

    const renderSearchBar = () => (
        <div className="Wrapper">
            <div className="Input">
                <form onSubmit={handleSubmit} className="FormInput">
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
                    <button onSubmit={handleSubmit} className="Submit-button">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );

    const renderResults = () => (
        <>
            {loadingSpinner ? _renderSpinner() : null}
            <span className="Title">
                {!domainInfo
                    ? ""
                    : domainInfo.meta.owner === null
                    ? INVALID_DOMAIN
                    : domainInfo.addresses[selectedCoin] || NO_ADDRESS_FOUND}
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
