import React from 'react';
import Loader from "../Loader";

 export default function RequestResult(props) {
    const { response, handleCreateRequest, error, processing } = props;
    return (
        <div className="b-request-result">
            { processing && <Loader processValue={"random name processing"} /> }
            { error && <>{error}<div><button onClick={handleCreateRequest}>Repeat request</button></div></>}
            <ul>{response && response.map(el => <li>{el}</li>)}</ul>
        </div>
    )
}

