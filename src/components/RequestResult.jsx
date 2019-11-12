import React, {useContext}from 'react';
import RequestResultPortal from './RequestResultPortal';
import { Color } from './Color';

export default function RequestResult(props) {
    const color = useContext(Color);
    const {response, handleCreateRequest, error, processing } = props;
    return (
        <RequestResultPortal>
                <div style={{backgroundColor: color}} className="request-result">
                    { processing && 
                        <span>Random name processing...</span>
                    }
                    {
                        error ? 
                        <>
                            {error}
                            <div><button onClick={handleCreateRequest}>Repeat request</button></div>
                        </>
                        : 
                        response
                    }
                </div>
        </RequestResultPortal>
    )
}

// export default withColor(RequestResult);

