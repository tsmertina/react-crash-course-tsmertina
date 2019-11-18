import React from 'react';

export default function ColorButtons(props) {
    const { handleColorChange } = props;
    return (
        <>
            <button className="b-app-button" onClick={() => handleColorChange('grey')}>grey theme</button>
            <button className="b-app-button" onClick={() => handleColorChange('lightgrey')}>lightgrey theme</button>
        </>
    )
}