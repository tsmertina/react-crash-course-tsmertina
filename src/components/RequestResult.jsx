import React, {useContext}from 'react';
import RequestResultPortal from './RequestButtonsPortal';
import { Color } from './Color';

export default function RequestResult(props) {
    const color = useContext(Color);
    const {response, handleCreateRequest, error } = props;
    return (
        <RequestResultPortal>
                <p style={{backgroundColor: color}}>
                    {
                        error ? 
                        <>
                            {error}
                            <br/>
                            <button onClick={handleCreateRequest}>Repeat request</button>
                        </>
                        : 
                        response
                    }
                </p>
        </RequestResultPortal>
    )
}

