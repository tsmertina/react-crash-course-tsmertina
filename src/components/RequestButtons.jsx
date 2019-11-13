import React from 'react';

function RequestButtons(props) {
    const { handleCreateRequest, handleCancelRequest, processing, forwardRef } = props;

    return (
        <div className="c-request-buttons">
            <button className="b-app-button" onClick={handleCreateRequest} disabled={processing}>Create Request</button>
            <button className="b-app-button" ref={forwardRef} onClick={handleCancelRequest}>Cancel request</button>
        </div>
    )
}
export default RequestButtons;