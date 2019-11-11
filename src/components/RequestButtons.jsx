import React, {useRef, useEffect} from 'react';
import RequestButtonsPortal from './RequestButtonsPortal';

function RequestButtons(props) {
    const {handleCreateRequest, handleCancelRequest, processing} = props;
    const cancelButtonRef = useRef();

    useEffect(() => {
        cancelButtonRef.current.focus();
    });

    return (
        <RequestButtonsPortal>
            <button onClick={handleCreateRequest} disabled={processing}>Create Request</button>
            <button ref={cancelButtonRef} onClick={handleCancelRequest}>Cancel request</button>

            {processing && 
                <p>Random name processing...</p>
            }
        </RequestButtonsPortal>
    )
}
export default RequestButtons;