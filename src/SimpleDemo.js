import React, { useState } from "react";
import Namicorn from "namicorn";

const NO_ADDRESS_FOUND = "No Address found for selected coin";
const NOT_REGISTERED = "Domain is not registered";
const INVALID_DOMAIN = "Invalid Domain";

const Demo = () => {
	const namicorn = new Namicorn();
	const [userInput, setUserInput] = useState("");
	const [loadingSpinner, setLoadingSpinner] = useState(false);
	const [domainInfo, setDomainInfo] = useState();
	const [selectedCoin, setSelectedCoin] = useState('BTC');


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

	const handleUserInput = e => {
		const tempUserInput = e.target.value;
		if (tempUserInput === "") {
			setDomainInfo(null);
			if (loadingSpinner) setLoadingSpinner(false);
		}
		setUserInput(tempUserInput.trim());
	};

	const handleSubmit = async e => {
		e.preventDefault();
		const potentialDomain = userInput.split(".");
		if (
			potentialDomain.length > 1 &&
			potentialDomain[potentialDomain.length - 1].length > 0
		) {
			setLoadingSpinner(true);
			setDomainInfo(null);
			if (window !== "undefined") {
				const result = await namicorn.address(userInput, selectedCoin);
				console.log({ result });
				setLoadingSpinner(false);
				if (!result)
					setDomainInfo('error');
				else
					setDomainInfo(result);
			}
		} else setDomainInfo({ invalid: true });
	};

	const _renderAddresses = addresess => {

		console.log({ addresess });
		if (!addresess) return NO_ADDRESS_FOUND;
		return (<div className="resultAddresses">
			<div className="resultAddressesRow">
				<span

					className="simpleTitle"
					style={{ fontWeight: "bold" }}
				>
					{selectedCoin} :{" "}
				</span>
				<span style={{ fontStyle: "italic" }} className="simpleTitle">
					{addresess}
				</span>
			</div>
		</div>
		);
	}

	const renderResults = () => (
		<>
			{loadingSpinner ? _renderSpinner() : null}
			{!domainInfo ? "" : _renderAddresses(domainInfo)}
		</>
	);

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
					<button onSubmit={handleSubmit} className="Submit-button">
						Submit
          </button>
				</form>
			</div>
		</div>
	);





	const renderRadioButtons = () => {

		const radioHandler = (e) => {
			setDomainInfo(null);
			setSelectedCoin(e.target.value);
		};


		return (
			<form className="radioForm">
				<label className="simpleTitle">
					<input
						type="radio" name="selectedCoin"
						value="BTC" checked={selectedCoin === "BTC"}
						onChange={radioHandler}
					/>
					BTC
				</label>
				<label className="simpleTitle">
					<input
						type="radio" name="selectedCoin"
						checked={selectedCoin === "ETH"}
						value="ETH" onChange={radioHandler} />
					ETH
				</label>
			</form>
		);
	}


	return (
		<div className="Demo">
			<div className="header">
				<h1 className="simpleTitle">Domain Name Resolution example</h1>
			</div>
			<div className="selection">{renderRadioButtons()}</div>
			<div className="searchBar">{renderSearchBar()}</div>
			<div className="results">{renderResults()}</div>
		</div>
	);
};

export default Demo;
