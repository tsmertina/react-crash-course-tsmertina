import React from 'react';

const RequestButtons = React.forwardRef((props, ref) => {
    const { handleCreateRequest, handleCancelRequest, processing } = props;

    return (
            <div className="c-request-buttons">
                <button className="b-app-button" onClick={handleCreateRequest} disabled={processing}>Create Request</button>
                <button className="b-app-button" ref={ref} onClick={handleCancelRequest} disabled={!processing}>Cancel request</button>
            </div>
        )
});

export default RequestButtons
