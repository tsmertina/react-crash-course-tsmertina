import React, {useRef, useEffect} from 'react';

function RequestButtons(props) {
    const {handleCreateRequest, handleCancelRequest, processing} = props;
    const cancelButtonRef = useRef();

    useEffect(() => {
        cancelButtonRef.current.focus();
    });

    return (
        <div class="b-request-buttons">
            <button className="b-app-button" onClick={handleCreateRequest} disabled={processing}>Create Request</button>
            <button className="b-app-button" ref={cancelButtonRef} onClick={handleCancelRequest}>Cancel request</button>
        </div>
    )
}
export default RequestButtons;