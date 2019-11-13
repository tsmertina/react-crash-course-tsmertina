import React, {useContext}from 'react';
import RequestResultPortal from './RequestResultPortal';
import { Color, withColor } from './Color';
import Loader from "./Loader";

 export default function RequestResult(props) {
    const color = useContext(Color);
    const {response, handleCreateRequest, error, processing } = props;
    return (
        <RequestResultPortal>
            <div style={{backgroundColor: color}} className="b-request-result">
                { processing && <Loader processValue={"random name processing"} /> }
                { error && <>{error}<div><button onClick={handleCreateRequest}>Repeat request</button></div></>}
                {response}
            </div>
        </RequestResultPortal>
    )
}

// export default withColor(RequestResult);

