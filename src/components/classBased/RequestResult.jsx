import React from 'react';
import Loader from "../Loader";

 export default function RequestResult(props) {
    const { response, handleCreateRequest, error, processing, id } = props;
    return (
        <div className="b-request-result">
            { processing && <Loader processValue={"random name processing"} /> }
            { error && <>{error}<div><button onClick={handleCreateRequest}>Repeat request</button></div></>}
            <ul>{response && response.map((el, index) => <li key={`${index}-${id}`}>{el}</li>)}</ul>
        </div>
    )
}

