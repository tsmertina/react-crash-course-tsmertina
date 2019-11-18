import React from 'react';

export default function Loader(props) {
    const { processValue } = props;
    return (
        <div className="c-loader">
            <object width="160px" height="20px" type="image/svg+xml" data="30.svg" aria-label="loader"></object>
            <p>Wait while {processValue}</p>
        </div>
    )
}