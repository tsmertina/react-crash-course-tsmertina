import axios from 'axios';
import React, { useState } from 'react';
import RequestButtons from '../RequestButtons';
import RequestResult from './RequestResult';
import { Color, withColor } from './Color';
import ColorButtons from '../ColorButtons';

let source = null;


export default function RequestFuncBased() {
    const [response, setResponse] = useState('');
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState('');
    const [color, setColor] = useState('white');
    const ref = React.createRef();

    let CancelToken = '';

    function createRequest() {
        ref.current.focus();
        CancelToken = axios.CancelToken;
        source = CancelToken.source();
        setResponse('');
        setProcessing(true);
        setError('');

        axios.get('https://randomuser.me/api/',
            { cancelToken: source.token},
        ).then((response) => {
            let res = response.data.results[0];
            setResponse(`${res.name.title} ${res.name.first} ${res.name.last}`);
            setProcessing(false);
        }).catch(error => {
            if (axios.isCancel(error)) {
                setResponse('');
                setProcessing(false);
                setError('Request cancelled');
            } else {
                setProcessing(false);
                setError(error.message);
            }
         });
    }

    function cancelRequest() {
        if (source) {
            source.cancel();
        }
    }
    
    function handleColorChange(param) {
        setColor(param)
    }

    return (
        <div style={{ backgroundColor: color }}>
            <ColorButtons handleColorChange={handleColorChange} />
            <RequestButtons ref={ref} processing={processing} handleCreateRequest={createRequest} handleCancelRequest={cancelRequest} />
            <Color.Provider value={color}>
                <RequestResult processing={processing} response={response} error={error} handleCreateRequest={createRequest}/>  
            </Color.Provider>
        </div>
    )
}
