import React from 'react';

export const Color = React.createContext('orange');

export function withColor(Component) {
    return class ColorWrapper extends React.Component {
        render() {
            return (
                <Color.Consumer>
                    {(value) => (
                        <Component color={value}/>
                    )}
                </Color.Consumer>
            )
        }
    }
}
