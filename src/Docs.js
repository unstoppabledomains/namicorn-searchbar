import React, { useState } from "react";
import Highlight from "react-highlight";

import "../node_modules/highlight.js/styles/darcula.css";

const test1 = `<div className="Demo">
<div className="header">
	<h1 className="Title">Domain Name Resolution example</h1>
</div>
<div className="searchBar">{renderSearchBar()}</div>
<div className="results">{renderResults()}</div>
</div>`;

const Docs = () => {
    return <Highlight className="JavaScript">{test1}</Highlight>;
};

export default Docs;
